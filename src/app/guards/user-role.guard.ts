import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IRoleAccount } from '../components/login/login.interface';
import { AccountService } from '../shareds/services/account.service';
import { AuthenService } from '../services/authen.service';
import { AppURL } from '../app.url';

@Injectable({
  providedIn: 'root'
})
export class UserRoleGuard implements CanActivate {

  constructor(
    private account: AccountService,
    private authen: AuthenService,
    private router: Router
    ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const roles: IRoleAccount[] = next.data.roles;
      return new Promise<boolean>((resolve, reject) => {
        this.account.getUserLogin(this.authen.getAuthenticated())
        .then(userLogin => {
          if(roles.filter(item => item == userLogin.role).length > 0)
          resolve(true);
          else {
            this.router.navigate(['/', AppURL.Authen]);
            resolve(false);
          }
        })
        .catch(() =>  resolve(false));
     
     })
  }
}
