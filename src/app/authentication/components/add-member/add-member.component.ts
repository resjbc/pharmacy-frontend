import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AppURL } from '../../../app.url';
import { AuthURL } from '../../authentication.url';
import { PersonService } from '../../services/person.service';
import { AlertService } from '../../../shareds/services/alert.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ICreatePersonComponent, IPerson } from '../create-person/person.interface';
import { IRoleAccount } from 'src/app/components/login/login.interface';
import { AuthenService } from 'src/app/services/authen.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit,ICreatePersonComponent {

  form: FormGroup;
  person: IPerson = null;
  flagEdit: boolean = false;


  displayedColumns: string[] = ['cid', 'firstname', 'lastname', 'mobile',  'role', 'edit', 'delete'];
  dataSource: MatTableDataSource<IPerson>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  AppURL = AppURL;
  AuthURL = AuthURL;

  roleItem: IRoleAccount[] = [
    IRoleAccount.Admin,
    IRoleAccount.ผู้ประกอบการ,
    IRoleAccount.เจ้าหน้าที่การเงิน,
    IRoleAccount.เจ้าหน้าที่คปส

  ];

  constructor(
    private personService: PersonService,
    private alert: AlertService,
    private build: FormBuilder,
    private authen: AuthenService
  ) {

  }

  ngOnInit() {
    this.loadPersons();
    this.initialCreateFormData();
    
  }

  onSubmit() {
  }

  initialCreateFormData() {
    this.form = this.build.group({
      firstname: ['', [Validators.required,Validators.pattern('^[ก-๏\sa-zA-Z]+$')]],
      lastname: ['', [Validators.required,Validators.pattern('^[ก-๏\sa-zA-Z]+$')]],
      cid: ['', [Validators.required,Validators.pattern("[0-9]{13,13}")]],
      address: [''],
      mobile: ['',[Validators.pattern("[0-9]{8,10}")]],
      username: [''],
      password: ['',[Validators.pattern(/^[A-z0-9]{6,15}$/)]],
      role: ["",Validators.required],
      id_person: [null]
    });
  }

  loadPersons() {
    this.personService.getPersons(this.authen.getAuthenticated()).then(person => {
      person = person.map( person_ => {
        person_.role_string = IRoleAccount[person_.role].toString();
        return person_;
      })
      this.dataSource = new MatTableDataSource(person);
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

  onEdit(person) {
    this.form.patchValue(person);
    this.flagEdit = true;
  }

  onDelete(person) {
    this.alert.confirm(`ต้องการลบคุณ ${person.firstname} ${person.lastname} ใช่หรือไม่`)
      .then(status => {
        if (status)
          this.personService.removePerson(person.id_person,this.authen.getAuthenticated())
            .then(() => {
              this.loadPersons();
              this.onClearForm();
            }).catch(err => this.alert.notify(err.Message));
      })
  }

  onAddPerson() {
    if (this.form.invalid) return this.alert.someting_wrong();
    this.person = this.form.value;
    this.person.role = 1;
    this.personService.addPerson(this.person,this.authen.getAuthenticated())
        .then(() => {
          this.alert.notify("เพิ่มผู้ประกอบการสำเร็จแล้ว","info");
          this.onClearForm();
          this.loadPersons();
        })
        .catch(err => this.alert.notify(err.Message));
    
  }

  onUpdatePerson() {
    if (this.form.invalid) return this.alert.someting_wrong();
    this.person = this.form.value;
    this.personService.addPerson(this.person,this.authen.getAuthenticated())
        .then(() => {
          this.alert.notify("แก้ไขข้มูลสำเร็จแล้ว","info");
          this.onClearForm()
          this.loadPersons();
        })
        .catch(err => this.alert.notify(err.Message));
  }

  onClearForm() {
    this.form.reset();
    this.form.patchValue({
      role: ""
    });
    this.flagEdit = false;
  }

  getRoleName(role: IRoleAccount) {
    return IRoleAccount[role];
  }
}