import { FormGroup } from "@angular/forms";
import { TemplateRef } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap";
import { IListItem } from "./add-item/add-item.interface";
import { IPerson } from "../create-person/person.interface";

export interface ICreateOrderComponent {
    form: FormGroup;
    modalRef: BsModalRef;
    onSubmit(): void;
    openModal(templete: TemplateRef<any>);
}

export interface ICreateOrder {
    listItems: IListItem[];
    i_person: IPerson;
}



export interface IReceipt {
    id_receipt?: number;
    id_person: number;
    id_reference?:number;
    id_member_create: number;
    id_member_cash?: number;
    place: string;
    place_address: string;
    date_created: Date;
    date_updated: Date;
    receiptDetails: IListItem[];
}

export interface IMemberReceipt {
    firstname: string;
    lastname: string;
    cid?: number;
    address?: string;
    mobile?: string;
}


export interface IPrintReceipt {
    id_receipt: number;
    place?: string;
    place_address?: string;
    date_created: Date;
    id_reference:number;
    id_receipt_cash?: number,
    id_receipt_cash_number?: number,
    person: IMemberReceipt;
    member_create: IMemberReceipt;
    member_cash? :IMemberReceipt;
    receiptDetails?: IListItem[];
}

