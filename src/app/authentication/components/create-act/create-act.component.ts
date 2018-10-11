import { Component, OnInit, ViewChild } from '@angular/core';
import { AppURL } from '../../../app.url';
import { AuthURL } from '../../authentication.url';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AlertService } from '../../../shareds/services/alert.service';
import { IActItem } from '../create-order/add-item/add-item.interface';
import { ICreateActComponent } from './create-act.interface';
import { AddlistService } from '../../services/addlist.service';
import { ActTypeListService } from '../../services/act-type-list.service';

@Component({
  selector: 'app-create-act',
  templateUrl: './create-act.component.html',
  styleUrls: ['./create-act.component.css'],
  providers: [AddlistService, ActTypeListService]
})
export class CreateActComponent implements OnInit, ICreateActComponent {

  act: IActItem = null;
  form: FormGroup;
  flagEdit: boolean = false;


  displayedColumns: string[] = ['id_act', 'description', 'edit', 'delete'];
  dataSource: MatTableDataSource<IActItem>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  AppURL = AppURL;
  AuthURL = AuthURL;



  constructor(
    private actService: AddlistService,
    private act_type_list: ActTypeListService,
    private alert: AlertService,
    private build: FormBuilder,
  ) {

  }

  ngOnInit() {
    this.loadActs();
    this.initialCreateFormData();
  }


  initialCreateFormData() {
    this.form = this.build.group({
      description: ['', [Validators.required,Validators.pattern('^[ก-๏\sa-zA-Z]+$')]],
      id_act: [null]
    });
  }

  loadActs() {
    this.actService.getActs().then(acts => {
      this.dataSource = new MatTableDataSource(acts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
      .catch(err => this.alert.notify(err.Message));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEdit(act) {
    this.form.patchValue(act);
    this.flagEdit = true;
  }

  onDelete(act) {
    this.alert.confirm(`ต้องการลบ พรบ ${act.description} ใช่หรือไม่`)
      .then(status => {
        if (status)
          this.act_type_list.removeAct(act.id_act)
            .then(() => {
              this.loadActs();
              this.onClearForm();
            }).catch(err => this.alert.notify(err.Message));
      })
  }

  onAddAct() {
    if (this.form.invalid ) return this.alert.someting_wrong();
    this.act = this.form.value;
    this.act_type_list.addAct(this.act)
      .then(() => {
        this.alert.notify("เพิ่ม พรบ สำเร็จแล้ว", "info");
        this.onClearForm()
        this.loadActs();
      })
      .catch(err => this.alert.notify(err.Message));

  }

  onUpdateAct() {
    if (this.form.invalid) return this.alert.someting_wrong();
    this.act = this.form.value;
    this.act_type_list.addAct(this.act)
      .then(() => {
        this.alert.notify("แก้ไขข้มูลสำเร็จแล้ว", "info");
        this.onClearForm()
        this.loadActs();
      })
      .catch(err => this.alert.notify(err.Message));
  }

  onClearForm() {
    this.form.reset();
    this.flagEdit = false;
  }


}
