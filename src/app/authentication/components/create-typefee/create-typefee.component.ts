import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ICreateTypeFeeComponent } from './create-typefee.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ITypeItem, IActItem } from '../create-order/add-item/add-item.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatSort } from '@angular/material';
import { AuthURL } from '../../authentication.url';
import { AddlistService } from '../../services/addlist.service';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { ActTypeListService } from '../../services/act-type-list.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthenService } from 'src/app/services/authen.service';
import { AppURL } from 'src/app/app.url';

@Component({
  selector: 'app-create-typefee',
  templateUrl: './create-typefee.component.html',
  styleUrls: ['./create-typefee.component.css'],
  providers: [AddlistService, ActTypeListService]
})
export class CreateTypefeeComponent implements OnInit, OnDestroy, ICreateTypeFeeComponent {

  acts: IActItem[] = null;
  type: ITypeItem = null;
  id_type: number;
  form: FormGroup;
  flagEdit: boolean = false;


  displayedColumns: string[] = ['id_type', 'description', 'edit', 'delete'];
  dataSource: MatTableDataSource<ITypeItem>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  AppURL = AppURL;
  AuthURL = AuthURL;
  private subscr: Subscription;



  constructor(
    private typeService: AddlistService,
    private act_type_list: ActTypeListService,
    private alert: AlertService,
    private build: FormBuilder,
    private authen: AuthenService
  ) {

  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.initialCreateFormData();
    this.onChanges();
    this.loadActs();
  }


  initialCreateFormData() {
    this.form = this.build.group({
      id_type: [null],
      id_act: ["", Validators.required],
      description: [{ value: '', disabled: true }, [Validators.required, Validators.pattern('^[ก-๏\sa-zA-Z.0-9]+$')]]
    });
  }

  loadActs() {
    this.typeService
      .getActs(this.authen.getAuthenticated())
      .then(acts =>
        this.acts = acts
      )
      .catch(err =>
        this.alert.notify(err.Message));
  }

  loadTypes(type) {
    this.typeService.getTypes(type,this.authen.getAuthenticated()).then(type => {
      this.dataSource = new MatTableDataSource(type);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }).catch(err => {
        this.alert.notify(err.Message);
        this.dataSource = null;
      });
  }

  onChanges() {
    this.subscr = this.form.get('id_act').valueChanges
      .subscribe(act => {
        if (act == '') {
          //this.form.get('type').reset();
          this.form.get('description').disable();
        }
        else {
          this.id_type = act;
          this.loadTypes(act);
          this.form.get('description').enable();
        }
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEdit(type) {
    this.form.patchValue(type);
    this.flagEdit = true;
  }

  onDelete(type) {
    this.alert.confirm(`ต้องการลบประเภทค่าธรรมเนียม ${type.description} ใช่หรือไม่`)
      .then(status => {
        if (status)
          this.act_type_list.removeType(type.id_type,this.authen.getAuthenticated())
            .then(() => {
              this.onClearForm();
              this.loadTypes(this.id_type);
              
            }).catch(err => this.alert.notify(err.Message));
      })
  }

  onAddUpdateType(save: boolean) {
    if (this.form.invalid) return this.alert.someting_wrong();
    this.type = this.form.value;
    this.act_type_list.addType(this.type,this.authen.getAuthenticated())
      .then(() => {
        if (save) this.alert.notify("เพิ่ม ประเภทค่าธรรมเนียม สำเร็จแล้ว", "info");
        else this.alert.notify("แก้ไขข้มูลสำเร็จแล้ว", "info");
        this.onClearForm();
        this.loadTypes(this.id_type);
      })
      .catch(err => this.alert.notify(err.Message));
  }

  onClearForm() {
    this.form.patchValue({
      description: "",
      id_type: null
    });
    this.flagEdit = false;
  }

  ngOnDestroy() {
    this.subscr.unsubscribe();
  }


}
