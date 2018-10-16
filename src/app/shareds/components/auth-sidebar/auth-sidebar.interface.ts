import { IAccount, IRoleAccount } from "src/app/components/login/login.interface";

export interface IAuthSidebarComponent {
    AppURL: any;
    AuthURL: any;
    userLogin: IAccount
    Role: typeof IRoleAccount;
}