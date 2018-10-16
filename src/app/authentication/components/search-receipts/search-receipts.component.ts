import { Component, OnInit, TemplateRef } from '@angular/core';
import { AppURL } from '../../../app.url';
import { AuthURL } from '../../authentication.url';
import { ActivatedRoute } from '@angular/router';
import { ReceiptService } from '../../services/receipt.service';
import { AlertService } from '../../../shareds/services/alert.service';
import { IPrintReceipt, IMemberReceipt } from '../create-order/create-order.interface';
import { IListItem } from '../create-order/add-item/add-item.interface';
import THBText from 'thai-baht-text';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { AuthenService } from 'src/app/services/authen.service';




@Component({
  selector: 'app-search-receipts',
  templateUrl: './search-receipts.component.html',
  styleUrls: ['./search-receipts.component.css']
})


export class SearchReceiptsComponent implements OnInit, IPrintReceipt {


  person: IMemberReceipt = null;
  member_create: IMemberReceipt
  member_cash?: IMemberReceipt
  id_receipt: number;
  place?: string;
  place_address?: string;
  date_created: Date;
  id_reference: number;
  _id_reference: number
  id_receipt_cash?: number;
  id_receipt_cash_number?: number;

  receiptDetails?: IListItem[] = [];

  AppURL = AppURL;
  AuthURL = AuthURL;

  totalPriceText: number;
  modalRef: BsModalRef;



  constructor(
    private activatedRouter: ActivatedRoute,
    private receiptService: ReceiptService,
    private alert: AlertService,
    private modalService: BsModalService,
    private authen: AuthenService
  ) {
  }

  ngOnInit() {
    this.activatedRouter.params.forEach(params => {
      this.id_reference = params.id_reference;
      if (this.id_reference) this.serchRecipt(this.id_reference);
    });
  }

  onSearchRecipt() {

    if (!this.id_reference) {
      this.alert.notify('ใส่เลขที่อ้างอิงใบสั่งซื้อให้ถูกต้อง');
      return;
    }
    this.serchRecipt(this.id_reference);

  }


  serchRecipt(id_reference: any) {
    this.receiptService
      .findReceipt(id_reference,this.authen.getAuthenticated())
      .then(receipt => {
        this.receiptDetails = receipt.receiptDetails;
        this.id_reference = receipt.id_reference;
        this._id_reference = receipt.id_reference;
        this.date_created = receipt.date_created;
        this.place_address = receipt.place_address;
        this.place = receipt.place;
        this.person = receipt.person;
        this.member_create = receipt.member_create;
        this.member_cash = receipt.member_cash;
        this.id_receipt = receipt.id_receipt;
        this.id_receipt_cash = receipt.id_receipt_cash;
        this.id_receipt_cash_number = receipt.id_receipt_cash_number

        if (receipt.person === null) this.alert.notify("ใบสั่งซื้อนี้ไม่สมบรูณ์เพราะไม่มีข้อมูลผู้ประกอบการ")
      })
      .catch(err => this.alert.notify(err.Message));
  }

  SumtotalPrice() {
    let totalPrice: number = 0;

    this.receiptDetails.forEach((listItem) => {
      totalPrice += parseInt(listItem.price + "");
    });
    this.totalPriceText = totalPrice;
    return totalPrice;
  }

  YearThai(year: any) {
    return parseInt(year) + 543;
  }

  BathText() {
    return THBText(this.totalPriceText);
  }

  openModal(templete: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templete, { class: 'modal-lg' });
  }


}
