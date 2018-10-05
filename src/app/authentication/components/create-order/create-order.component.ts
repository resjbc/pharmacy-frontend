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
import { ReceiptService } from '../../services/receipt.service';

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

  receipt: IReceipt = null;
  id_receipt: any = null;


  constructor(
    private build: FormBuilder,
    private modalService: BsModalService,
    private alert: AlertService,
    private personService: PersonService,
    private receiptService: ReceiptService
  ) {
    this.initialCreateFormData();
  }

  form: FormGroup;
  modalRef: BsModalRef;

  onSubmit() {
    if (this.form.invalid) return this.alert.someting_wrong();
    //this.flagPrint = true; 
    //console.log(this.id_recipt);

    

    this.receipt = {
      id_person: this.i_person.id_person,
      date_created: !this.id_receipt ? new Date() : this.receipt.date_created,
      date_updated: new Date(),
      id_member_create: 1,
      place: this.form.controls.placeName.value,
      place_address: this.form.controls.placeAddress.value,
      receiptDetails: this.listItems
    }

    if(this.id_receipt) this.receipt.id_receipt = this.id_receipt;

    console.log(this.receipt);  

    this.receiptService.createReceipt(this.receipt).then(result => {

      if (result) {
        this.receipt = result;
        this.id_receipt = this.receipt.id_receipt;
        this.listItems = this.receipt.receiptDetails
        console.log(result);
      }

    }).catch(err => this.alert.notify(err.Message));


    /*console.log({
      
    });*/
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

    this.personService
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