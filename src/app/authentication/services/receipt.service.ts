import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IReceipt } from '../components/create-order/create-order.interface';
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
}




