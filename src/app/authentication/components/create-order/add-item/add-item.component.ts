import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { IAddItemComponent } from './add-item.interface';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements IAddItemComponent {

  constructor( 
    private builder: FormBuilder
  ) { 
    this.initailCreateFormData()
  }

  @Input('modalRef') modalRef: BsModalRef;
  form: FormGroup;

  onSubmit():void {

  }

  // สร้ามฟอร์ม
  private initailCreateFormData() {
	  this.form = this.builder.group({
		  act: ['', Validators.required],
		  type: ['', Validators.required],
		  list: ['', Validators.required]
	  });
  }

}
