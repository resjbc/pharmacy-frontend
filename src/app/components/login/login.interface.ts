import { FormGroup } from "@angular/forms";

export interface ILoginComponent {
    Url: any;
    form: FormGroup;
    returnURL: string;
    onSubmit(): void;
}

export interface ILogin {
    user: string;
    password: string;
}


export interface IAccount {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    id_person?: any;
    role?
    cid: string;
    address?: string
    mobile?: string
}

export enum IRoleAccount {
    ผู้ประกอบการ = 1,
    เจ้าหน้าที่การเงิน,
    เจ้าหน้าที่คบส,
    Admin
}
