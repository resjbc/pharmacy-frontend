import { IRoleAccount } from "../../../shareds/services/account.service";

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