import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IPerson } from '../create-person/person.interface';
import { AppURL } from 'src/app/app.url';
import { AuthURL } from '../../authentication.url';
import { IRoleAccount, IAccount } from 'src/app/components/login/login.interface';
import { PersonService } from '../../services/person.service';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { AuthenService } from 'src/app/services/authen.service';
import { AccountService } from 'src/app/shareds/services/account.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  form: FormGroup;
  userLogin: IAccount = { role: 2 } as any;
  flagEdit: boolean = false;
  modalRef: BsModalRef;


  AppURL = AppURL;
  AuthURL = AuthURL;

  roleItem: IRoleAccount[] = [
    IRoleAccount.Admin,
    IRoleAccount.ผู้ประกอบการ,
    IRoleAccount.เจ้าหน้าที่การเงิน,
    IRoleAccount.เจ้าหน้าที่คบส

  ];

  constructor(
    private personService: PersonService,
    private alert: AlertService,
    private build: FormBuilder,
    private authen: AuthenService,
    private account: AccountService,
    private modalService: BsModalService,
  ) {
    this.initialCreateFormData();
  }

  ngOnInit() {

    this.account.getUserLogin(this.authen.getAuthenticated())
      .then(user => {
        this.userLogin = user;
        this.form.setValue({
          firstname: this.userLogin.firstname,
          lastname: this.userLogin.lastname,
          cid: this.userLogin.cid,
          address: this.userLogin.address,
          mobile: this.userLogin.mobile,
          id_person: this.userLogin.id_person,
        });

      }).catch(err => this.alert.notify(err.Message));

  }

  onSubmit() {
  }

  initialCreateFormData() {
    this.form = this.build.group({
      firstname: ['', [Validators.required, Validators.pattern('^[ก-๏\sa-zA-Z]+$')]],
      lastname: ['', [Validators.required, Validators.pattern('^[ก-๏\sa-zA-Z]+$')]],
      cid: ['', [Validators.required, Validators.pattern("[0-9]{13,13}")]],
      address: [''],
      mobile: ['', [Validators.pattern("[0-9]{8,10}")]],
      id_person: [null]
    });
  }


  onUpdatePerson() {
    if (this.form.invalid) return this.alert.someting_wrong();
    this.userLogin = this.form.value;
    this.userLogin.role = this.account.UserLogin.role;
    this.personService.addPerson(this.userLogin, this.authen.getAuthenticated())
      .then(() =>
        this.account.getUserLogin(this.authen.getAuthenticated())
          .then(() => this.alert.notify("แก้ไขข้มูลสำเร็จแล้ว", "info"))
          .catch(err => this.alert.notify(err.Message))
      )
      .catch(err => this.alert.notify(err.Message));
  }


  onResetForm() {
    this.form.setValue({
      firstname: this.account.UserLogin.firstname,
      lastname: this.account.UserLogin.lastname,
      cid: this.account.UserLogin.cid,
      address: this.account.UserLogin.address,
      mobile: this.account.UserLogin.mobile,
      id_person: this.account.UserLogin.id_person,
    });
  }

  getRoleName(role: IRoleAccount) {
    return IRoleAccount[role];
  }

  openModal(template: TemplateRef<any>) {
    //console.log(this);
    this.modalRef = this.modalService.show(template);
  }

}
