import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ICreateOrderComponent } from './create-order.interface';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements ICreateOrderComponent {

  constructor(
    private build: FormBuilder,
    private modalService: BsModalService,
  ) { 
    this.initialCreateFormData();
  }

  form: FormGroup;
  modalRef: BsModalRef;

  onSubmit() {

  }

  openModal(templete: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templete);
  }

  initialCreateFormData() {
    this.form = this.build.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      pid: ['', Validators.required],
      address: [''],
      mobile: [''],
      placeName: [''],
      placeAddress: ['']
    });
  }



}
