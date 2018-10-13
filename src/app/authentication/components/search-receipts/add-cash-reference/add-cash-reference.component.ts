import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { ReceiptService } from 'src/app/authentication/services/receipt.service';

@Component({
  selector: 'app-add-cash-reference',
  templateUrl: './add-cash-reference.component.html',
  styleUrls: ['./add-cash-reference.component.css']
})
export class AddCashReferenceComponent implements OnInit {

  @Input('modalRef') modalRef: BsModalRef;
  @Input('id_receipt') id_receipt: any;
  @Input('id_receipt_cash') id_receipt_cash: any;
  @Input('id_receipt_cash_number') id_receipt_cash_number: any;

  form: FormGroup;
  receipt_update: IUpdateReceiptCash = null;

  constructor(
    private builder: FormBuilder,
    private alert: AlertService,
    private receiptService: ReceiptService) {
   
  }

  ngOnInit() {
    //console.log(this.id_receipt);
    this.initailCreateFormData();
  }

  private initailCreateFormData() {

    this.form = this.builder.group({
      id_receipt_cash: [{ value: this.id_receipt_cash || '', disabled: false }, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      id_receipt_cash_number: [{ value: this.id_receipt_cash_number || '', disabled: false }, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    });
  }

  onSubmit() {
    if (this.form.invalid) return this.alert.someting_wrong();
    this.receipt_update = this.form.value;
    this.receipt_update.id_receipt = this.id_receipt;
    this.receipt_update.id_member_cash = 2
    this.receiptService
      .updateReceiptCash(this.receipt_update)
      .then(() => {
        this.alert.notify("บันทึกหมายเลขใบเสร็จสำเร็จแล้ว", "info");
        this.modalRef.hide();
      })
      .catch(err => this.alert.notify(err.Message));
  }

}

interface IUpdateReceiptCash {
  id_receipt_cash: number;
  id_receipt_cash_number: number;
  id_receipt: number;
  id_member_cash: number;
}
