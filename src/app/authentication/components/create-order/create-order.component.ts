import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ICreateOrderComponent, ICreateOrder, IReceipt } from './create-order.interface';
import { IListItem } from './add-item/add-item.interface';
import { AlertService } from '../../../shareds/services/alert.service';
import { AppURL } from '../../../app.url';
import { AuthURL } from '../../authentication.url';
import { PersonService } from '../../services/person.service';
import { IPerson } from '../create-person/person.interface';
import { IRoleAccount } from '../../../shareds/services/account.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements ICreateOrderComponent, ICreateOrder {


  
  listItems: IListItem[] = [];
  i_person: IPerson = null;

  AppURL = AppURL;
  AuthURL = AuthURL;

  flagPrint: boolean = false;

  reciept: IReceipt;
  

  constructor(
    private build: FormBuilder,
    private modalService: BsModalService,
    private alert: AlertService,
    private person: PersonService
  ) {
    this.initialCreateFormData();
  }

  form: FormGroup;
  modalRef: BsModalRef;

  onSubmit() {
    this.flagPrint = true;

    /*this.reciept["date_created"] = new Date();
    this.reciept["date_updated"] = new Date();
    this.reciept["id_member_create"] = 1;
    this.reciept["id_person"] = this.i_person.id_person;
    this.reciept["place"] = this.form.controls.placeName.value;
    this.reciept["place_address"] = this.form.controls.placeAddress.value;
    this.reciept["recieptDetails"] = this.listItems;*/

    console.log(this.reciept);
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

  onSearchPid(pid: string) {
    if (!parseInt(pid) || !(pid.trim().length == 13)) {
      this.alert.notify('ตรวจสอบหมายเลขบัตรประชาชน');
      return;
    }

    this.person
      .getPerson(pid)
      .then(person => {
        this.i_person = person;
        this.form.setValue({
          firstname: this.i_person.firstname,
          lastname: this.i_person.lastname,
          pid: this.i_person.cid,
          address: this.i_person.address,
          mobile: this.i_person.mobile,
          placeName: '',
          placeAddress: ''
        });
        //console.log(IRoleAccount[this.i_person.role]);
      })
      .catch(err => {
        this.alert.notify(err.Message);
      });
  }

  /*getRoleName(role: IRoleAccount) {
    return IRoleAccount[role];
  }*/

}