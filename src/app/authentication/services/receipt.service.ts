import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IReceipt, IPrintReceipt } from '../components/create-order/create-order.interface';
import { IListItem } from '../components/create-order/add-item/add-item.interface';
import { ISearchReceiptDateComponent } from '../components/search-receipts-date/search-receipts-date.interface';
declare let $;

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  constructor(private http: HttpService) { }

  createReceipt(receipt: IReceipt ,accessToken: string) {
    return this.http
      .requestPost(`receipt/add`, receipt,accessToken)
      .toPromise() as Promise<IReceipt>;
  }

  deleteReceiptDetail(id_receipt_detail,accessToken: string ) {
    return this.http
      .requestDelete(`receipt/receiptDetail/${id_receipt_detail}`,accessToken)
      .toPromise() as Promise<any>;
  }

  findReceipt(id_reference ,accessToken: string) {
    return this.http
      .requestGet(`receipt/${id_reference}`,accessToken)
      .toPromise() as Promise<IPrintReceipt>;
  }

  findReceiptDate(receipt_date,accessToken: string) {
    return this.http
      .requestGet(`receipt/?${$.param(receipt_date)}`,accessToken)
      .toPromise() as Promise<ISearchReceiptDateComponent[]>;
  }

  findReceiptPerson(cid,accessToken: string) {
    return this.http
    .requestGet(`receipt/person/${cid}`,accessToken)
    .toPromise() as Promise<ISearchReceiptDateComponent[]>;
  }

  findReceiptCash(receipt_cash,accessToken: string){
    return this.http
    //.requestGet(`receipt/cash/${receipt_cash.id_receipt_cash}`)
    .requestGet(`receipt/cash?${$.param(receipt_cash)}`,accessToken)
    .toPromise() as Promise<ISearchReceiptDateComponent[]>;
  }

  updateReceiptCash(receipt,accessToken: string){
    return this.http
      .requestPost(`receipt/update`, receipt,accessToken)
      .toPromise() as Promise<any>; 
  }



}




