import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IListItem, ITypeItem, IActItem } from '../create-order/add-item/add-item.interface';
import { MatPaginator, MatSort } from '@angular/material';
import { AppURL } from '../../../app.url';
import { AuthURL } from '../../authentication.url';
import { Subscription } from 'rxjs';
import { AddlistService } from '../../services/addlist.service';
import { ActTypeListService } from '../../services/act-type-list.service';
import { AlertService } from '../../../shareds/services/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICreateListComponent } from './create-listfee.interface';
import { AuthenService } from 'src/app/services/authen.service';

@Component({
  selector: 'app-create-listfee',
  templateUrl: './create-listfee.component.html',
  styleUrls: ['./create-listfee.component.css'],
  providers: [AddlistService, ActTypeListService]
})
export class CreateListfeeComponent implements OnInit, OnDestroy, ICreateListComponent {

  flagEdit: boolean = false;
  types: ITypeItem[] = null;
  form: FormGroup;
  list: IListItem;
  id_type: number;
  acts: IActItem[] = null;

  displayedColumns: string[] = ['id_list', 'description', 'price', 'edit', 'delete'];
  dataSource: MatTableDataSource<IListItem>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  AppURL = AppURL;
  AuthURL = AuthURL;
  private subscrType: Subscription;
  private subscrAct: Subscription;



  constructor(
    private listService: AddlistService,
    private act_type_list: ActTypeListService,
    private alert: AlertService,
    private build: FormBuilder,
    private authen: AuthenService
  ) {

  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.initialCreateFormData();
    this.onChangesActs();
    this.onChangesTypes();
    this.loadActs();
  }


  initialCreateFormData() {
    this.form = this.build.group({
      id_act: ["", Validators.required],
      id_list: [null],
      id_type: [{ value: '', disabled: true }, Validators.required],
      description: [{ value: '', disabled: true }, [Validators.required]],
      price: [{ value: '', disabled: true }, [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  loadActs() {
    this.listService
      .getActs(this.authen.getAuthenticated())
      .then(acts =>
        this.acts = acts
      )
      .catch(err =>
        this.alert.notify(err.Message));
  }

  onChangesActs() {
    this.subscrAct = this.form.get('id_act').valueChanges
      .subscribe(act => {
        if (act == '') {
          //this.form.get('type').reset();
          this.form.get('id_type').disable();
          this.form.get('description').disable();
          this.form.get('price').disable();
          //this.dataSource = null;
        }
        else {
          this.id_type = act;
          this.loadTypes(act);
        }
      });
  }

  loadTypes(type) {
    this.listService.getTypes(type,this.authen.getAuthenticated()).then(types => {
      this.types = types;
      this.form.get('id_type').enable();
    }).catch(err => {
      this.alert.notify(err.Message);
      this.form.get('id_type').disable();
      this.form.get('description').disable();
      this.form.get('price').disable();
      //this.dataSource = null;
    });
  }

  onChangesTypes() {
    this.subscrType = this.form.get('id_type').valueChanges
      .subscribe(type => {
        if (type == '') {
          //this.form.get('type').reset();
          this.form.get('description').disable();
          this.form.get('price').disable();
        }
        else {
          this.id_type = type;
          this.loadLists(type);
          this.form.get('description').enable();
          this.form.get('price').enable();
        }
      });

  }

  loadLists(list) {

    this.listService.getLists(list,this.authen.getAuthenticated()).then(lists => {
      this.dataSource = new MatTableDataSource(lists);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }).catch(err => {
      this.alert.notify(err.Message);
      this.dataSource = null;
    });
  }



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEdit(list) {
    this.form.patchValue(list);
    this.flagEdit = true;
  }

  onDelete(list) {
    this.alert.confirm(`ต้องการลบรายการนี้ใช่หรือไม่`)
      .then(status => {
        if (status)
          this.act_type_list.removeList(list.id_list,this.authen.getAuthenticated())
            .then(() => {
              this.onClearForm();
              this.loadLists(this.id_type);

            }).catch(err => this.alert.notify(err.Message));
      })
  }

  onAddUpdateType(save: boolean) {
    if (this.form.invalid) return this.alert.someting_wrong();
    this.list = this.form.value;
    this.act_type_list.addList(this.list,this.authen.getAuthenticated())
      .then(() => {
        if (save) this.alert.notify("เพิ่มรายการสำเร็จแล้ว", "info");
        else this.alert.notify("แก้ไขข้มูลสำเร็จแล้ว", "info");
        this.onClearForm();
        this.loadLists(this.id_type);
      })
      .catch(err => this.alert.notify(err.Message));
  }

  onClearForm() {
    this.form.patchValue({
      description: "",
      price: ""
    });
    this.flagEdit = false;
  }

  ngOnDestroy() {
    this.subscrType.unsubscribe();
    this.subscrAct.unsubscribe();
  }

}
