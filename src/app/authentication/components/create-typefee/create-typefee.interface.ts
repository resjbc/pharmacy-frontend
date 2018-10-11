import { FormGroup } from "@angular/forms";
import { ITypeItem, IActItem } from "../create-order/add-item/add-item.interface";

export interface ICreateTypeFeeComponent {
    form: FormGroup;
    onAddUpdateType(save: boolean): void;
    type:ITypeItem
    acts: IActItem[];
}