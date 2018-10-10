import { FormGroup } from "@angular/forms";
import { IActItem } from "../create-order/add-item/add-item.interface";

export interface ICreateActComponent {
    form: FormGroup;
    onSubmit(): void;
    act: IActItem;
}