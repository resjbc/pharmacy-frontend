import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ICreateOrderComponent, ICreateOrder } from './create-order.interface';
import { IListItem } from './add-item/add-item.interface';
import { AlertService } from '../../../shareds/services/alert.service';
import { AppURL } from '../../../app.url';
import { AuthURL } from '../../authentication.url';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements ICreateOrderComponent, ICreateOrder {

  firstname: string;
  lastname: string;
  pid: string;
  address: string;
  mobile: string;
  placeName: string;
  placeAddress: string;
  listItems: IListItem[] = [];

  AppURL = AppURL;
  AuthURL = AuthURL;



  constructor(
    private build: FormBuilder,
    private modalService: BsModalService,
    private alert: AlertService
  ) {
    this.initialCreateFormData();
  }

  form: FormGroup;
  modalRef: BsModalRef;

  onSubmit() {
    console.log(this.form.value);
  }

  openModal(templete: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templete, { class: 'modal-lg' });
  }

  initialCreateFormData() {
    this.form = this.build.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      pid: ['', Validators.required],
      address: [''],
      mobile: [''],
      placeName: [''],
      placeAddress: [''],
    });
  }

  resultListItem(listItem_: IListItem) {

    if (this.listItems.find(listItem => listItem.id_list === listItem_.id_list)) {
      this.alert.notify("มีรายการนี้ในใบสั่งซื้อแล้ว");
      return;
    }
    this.listItems.push(listItem_);
  }

  onDeleteListItem(index: number) {
    //this.listItems.pop();
    this.alert
      .confirm('ต้องการลบรายการใช่หรือไม่')
      .then(status => {
        if (status) this.listItems.splice(index, 1);
      })
  }

  SumtotalPrice() {
    let totalPrice: number = 0;

    this.listItems.forEach((listItem) => {
      totalPrice += parseInt(listItem.price + "");
    });

    return totalPrice;
  }

  onSearchPid(pid){
    console.log(pid);
  }

}