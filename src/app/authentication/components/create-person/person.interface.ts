import { IRoleAccount } from "../../../shareds/services/account.service";
import { FormGroup } from "@angular/forms";

export interface IPerson {
    id_person?: number,
    cid: string,
    firstname: string,
    lastname: string,
    address?: string,
    mobile?: string,
    username?: string,
    password?: string,
    role: IRoleAccount
}

export interface ICreatePersonComponent {
    form: FormGroup;
    onSubmit(): void;
    person: IPerson;
}

