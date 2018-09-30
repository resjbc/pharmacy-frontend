import { BsModalRef } from "ngx-bootstrap";
import { FormGroup } from "@angular/forms";

export interface IAddItemComponent {
    modalRef: BsModalRef;
    form: FormGroup;

    onSubmit():void;
}

export interface IAddItem {
    list: string;
    act: string;   
    type: string; 
}

export interface IActItem {
    id_act: number,
    description: string
}

export interface ITypeItem {
    id_type: number,
    description: string
}

export interface IListItem {
    id_list: number,
    description: string,
    price: number,
    type_description?: string

}


