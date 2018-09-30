import { FormGroup } from "@angular/forms";
import { TemplateRef } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap";
import { IListItem } from "./add-item/add-item.interface";

export interface ICreateOrderComponent {
    form: FormGroup;
    modalRef: BsModalRef; 
    onSubmit(): void;
    openModal(templete: TemplateRef<any>);
}

export interface ICreateOrder {
    firstname: string;
    lastname:  string;
    pid:  string;
    address:  string;
    mobile:  string;
    placeName:  string;
    placeAddress:  string;
    listItems: IListItem[];
}