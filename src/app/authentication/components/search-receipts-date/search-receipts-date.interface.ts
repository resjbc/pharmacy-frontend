import { IMemberReceipt } from "../create-order/create-order.interface";

export interface ISearchReceiptDateComponent {
    date_created: Date;
    id_reference:number;
    id_receipt_cash?: number,
    id_receipt_cash_number?: number,
    person: IMemberReceipt;
}

export interface IReceiptDate {
    myDateStart: any;
    myDateEnd: any;
    
}

