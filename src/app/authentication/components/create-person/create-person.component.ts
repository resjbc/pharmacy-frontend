import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AppURL } from '../../../app.url';
import { AuthURL } from '../../authentication.url';
import { PersonService } from '../../services/person.service';
import { AlertService } from '../../../shareds/services/alert.service';
import { IPerson, ICreatePersonComponent } from './person.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.css']
})
export class CreatePersonComponent implements OnInit, ICreatePersonComponent {
  

  form: FormGroup;
  person: IPerson = null;
  flagEdit: boolean = false;


  displayedColumns: string[] = ['cid', 'firstname', 'lastname', 'mobile', 'edit', 'delete'];
  dataSource: MatTableDataSource<IPerson>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  AppURL = AppURL;
  AuthURL = AuthURL;



  constructor(
    private personService: PersonService,
    private alert: AlertService,
    private build: FormBuilder,
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
      password: [''],
      role: [1],
      id_person: [null]
    });
  }

  loadPersons() {
    this.personService.getPersons().then(person => {
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
          this.personService.removePerson(person.id_person)
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
    this.personService.addPerson(this.person)
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
    this.person.role = 1;
    this.personService.addPerson(this.person)
        .then(() => {
          this.alert.notify("แก้ไขข้มูลสำเร็จแล้ว","info");
          this.onClearForm()
          this.loadPersons();
        })
        .catch(err => this.alert.notify(err.Message));
  }

  onClearForm() {
    this.form.reset();
    this.flagEdit = false;
  }

  /*getRoleName(role: IRoleAccount) {
    return IRoleAccount[role];
  }*/
}

/** Builds and returns a new User. 
function createNewUser(id: number): UserData {
  const firstname =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    firstname: firstname,
    lastname: firstname + "ss",
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };

}*/


