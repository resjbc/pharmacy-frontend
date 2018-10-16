import { Injectable } from '@angular/core';
import { ILogin, IAccount } from 'src/app/components/login/login.interface';
import { HttpService } from 'src/app/authentication/services/http.service';
import { IPerson } from 'src/app/authentication/components/create-person/person.interface';
import { IChangePassword } from 'src/app/authentication/components/profile/change-password/change-password.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpService) { }

  // store user login ไว้
  public UserLogin: IAccount = {} as any;

  public setUserLogin(userLogin: IAccount) {

    this.UserLogin.id_person = userLogin.id_person;
    this.UserLogin.firstname = userLogin.firstname;
    this.UserLogin.lastname = userLogin.lastname;
    this.UserLogin.address = userLogin.address;
    this.UserLogin.mobile = userLogin.mobile;
    this.UserLogin.password = userLogin.password;
    this.UserLogin.username = userLogin.username;
    this.UserLogin.role = userLogin.role;
    this.UserLogin.cid = userLogin.cid;

    return this.UserLogin;
  }

  onLogin(model: ILogin) {
    return this.http
      .requestPost(`account/login`, model)
      .toPromise() as Promise<{ accessToken: string }>;
  }

  async getUserLogin(accessToken: string) {
    const userLogin = await (this.http
      .requestGet(`account/data`, accessToken)
      .toPromise() as Promise<IAccount>);
    return this.setUserLogin(userLogin);
  }


  //เปลี่ยนรหัสผ่านใหม่
  onChangePassword(accessToken: string, model: IChangePassword) {
    return this.http
      .requestPost('account/change-password', model, accessToken)
      .toPromise() as Promise<any>;

  }



  //แก้ไขข้อมูลส่วนตัว Update Progile
  async onUpdateProfile(accessToken: string, model: IPerson) {

    const user = await (this.http
      .requestPost('api/member/profile', model, accessToken)
      .toPromise() as Promise<IAccount>);
    return this.setUserLogin(user);

  }


}


