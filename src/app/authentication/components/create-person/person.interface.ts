import { FormGroup } from "@angular/forms";
import { IRoleAccount } from "src/app/components/login/login.interface";

export interface IPerson {
    id_person?: number;
    cid: string;
    firstname: string;
    lastname: string;
    address?: string;
    mobile?: string;
    username?: string;
    password?: string;
    role?:IRoleAccount;
    role_string?:string;
}

export interface ICreatePersonComponent {
    form: FormGroup;
    onSubmit(): void;
    person: IPerson;
}

