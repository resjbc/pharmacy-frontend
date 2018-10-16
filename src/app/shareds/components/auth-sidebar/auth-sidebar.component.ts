import { Component, OnInit } from '@angular/core';
import { AppURL } from '../../../app.url';
import { AuthURL } from '../../../authentication/authentication.url';
import { IAuthSidebarComponent } from './auth-sidebar.interface';
import { IAccount, IRoleAccount } from 'src/app/components/login/login.interface';
import { AccountService } from '../../services/account.service';
import { AuthenService } from 'src/app/services/authen.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';
declare const App;

@Component({
  selector: 'app-auth-sidebar',
  templateUrl: './auth-sidebar.component.html',
  styleUrls: ['./auth-sidebar.component.css']
})
export class AuthSidebarComponent implements OnInit, IAuthSidebarComponent {
  
  Role: typeof IRoleAccount;
  AppURL = AppURL;
  AuthURL = AuthURL;
  userLogin: IAccount // = {} as any;

  constructor(
    private account: AccountService,
    private authen: AuthenService,
    private alert: AlertService,
    private router: Router
  ) {
    this.initailLoadUserlogin();
   }

  ngOnInit() {
  }

  private initailLoadUserlogin() {

    this.userLogin = this.account.UserLogin;
    if (this.userLogin.id_person) return setTimeout(() => App.initialLoadPage(), 100);

    this.account
      .getUserLogin(this.authen.getAuthenticated())
      .then(userLogin_ => {
        this.userLogin = userLogin_;
         //โหลดข้อมูล Script สำหรับ sidebar
         setTimeout(() => App.initialLoadPage(), 100);
      })
      .catch(err => {
        this.alert.notify(err.Message);
        this.authen.clearAuthenticated();
        this.router.navigate(['/', AppURL.Login]);
      });
  }

  getRoleName(role: IRoleAccount) {
    return IRoleAccount[role];
  }

}
