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