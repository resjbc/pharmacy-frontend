import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IReceipt, IPrintReceipt } from '../components/create-order/create-order.interface';
import { IListItem } from '../components/create-order/add-item/add-item.interface';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  constructor(private http: HttpService) { }

  createReceipt(receipt: IReceipt) {
    return this.http
      .requestPost(`receipt/add`, receipt)
      .toPromise() as Promise<IReceipt>;
  }

  deleteReceiptDetail(id_receipt_detail) {
    return this.http
      .requestDelete(`receipt/receiptDetail/${id_receipt_detail}`)
      .toPromise() as Promise<any>;
  }

  findReceipt(id_reference) {
    return this.http
      .requestGet(`receipt/${id_reference}`)
      .toPromise() as Promise<IPrintReceipt>;
  }

}




