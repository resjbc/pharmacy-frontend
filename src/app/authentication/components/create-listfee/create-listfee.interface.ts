import { FormGroup } from "@angular/forms";
import { ITypeItem, IActItem } from "../create-order/add-item/add-item.interface";

export interface ICreateListComponent {
    form: FormGroup;
    onAddUpdateType(save: boolean): void;
    types:ITypeItem[];
    id_type: number;
    acts: IActItem[];
    flagEdit: boolean;
}