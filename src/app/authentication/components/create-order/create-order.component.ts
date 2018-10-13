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
import { ActivatedRoute, Router } from '@angular/router';

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
    private receiptService: ReceiptService,
    private router: Router
  ) {
    this.initialCreateFormData();

  }

  form: FormGroup;
  modalRef: BsModalRef;

  onSubmit() {
    if (this.form.invalid) return this.alert.someting_wrong();
    else if (!this.i_person) return this.alert.notify("เพิ่มผู้ประกอบการคนนี้ในระบบก่อน");

    this.receipt = {
      id_person: this.i_person.id_person,
      date_created: !this.id_receipt ? new Date() : this.receipt.date_created,
      date_updated: new Date(),
      id_member_create: 1,
      place: this.form.controls.placeName.value,
      place_address: this.form.controls.placeAddress.value,
      receiptDetails: this.listItems
    }

    if (!this.receipt.id_person) return this.alert.notify("เพิ่มผู้ประกอบการคนนี้ในระบบก่อน");

    if (this.id_receipt) this.receipt.id_receipt = this.id_receipt;

    //console.log(this.receipt);  

    this.receiptService.createReceipt(this.receipt).then(result => {

      if (result) {
        this.receipt = result;
        this.id_receipt = this.receipt.id_receipt;
        this.listItems = this.receipt.receiptDetails
      }

      this.flagPrint = true;

      this.alert.confirm("บันทึกข้อมูลสำเร็จแล้ว ต้องการไปหน้าพิมพ์หรือไม่")
        .then(status => {
          if (status) this.toPrint();
        })

    }).catch(err => this.alert.notify(err.Message));


    /*console.log({
      
    });*/
  }

  openModal(templete: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templete, { class: 'modal-lg' });
  }

  initialCreateFormData() {
    this.form = this.build.group({
      firstname: [{ value: '', disabled: true }, Validators.required],
      lastname: [{ value: '', disabled: true }, Validators.required],
      pid: [{ value: '', disabled: true }, Validators.required],
      address: [{ value: '', disabled: true }],
      mobile: [{ value: '', disabled: true }],
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
    this.flagPrint = false;
  }

  onDeleteListItem(index: number) {

    this.alert
      .confirm('ต้องการลบรายการใช่หรือไม่')
      .then(status => {
        if (!status) return;
        else {
          if (!this.id_receipt) {
            this.listItems.splice(index, 1);
            return;
          }
          //console.log(this.listItems[index].id_receipt_detail);
          this.receiptService
            .deleteReceiptDetail(this.listItems[index].id_receipt_detail)
            .then(() => {
              this.listItems.splice(index, 1);
            })
            .catch(err => this.alert.notify(err.Message))
        }
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

  clearReceipt() {
    this.receipt = null;
    this.i_person = null;
    this.listItems = [];
    this.flagPrint = false;
    this.initialCreateFormData();
  }

  toPrint() {
    this.router.navigate(['',
      AppURL.Authen,
      AuthURL.SearchReceipts,
      this.receipt.id_reference
    ]);//, {queryParams: {id: item.id}});

  }



}