import { IMemberReceipt } from "../create-order/create-order.interface";

export interface ISearchReceiptDate {
    id_receipt: number;
    date_created: Date;
    id_reference:number;
    id_receipt_cash?: number,
    id_receipt_cash_number?: number,
    person: IMemberReceipt;
}

export interface ParamReceiptDate {
    myDateStart: any;
    myDateEnd: any;
}