import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors, AbstractControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { IAddItemComponent, IActItem, ITypeItem, IListItem } from './add-item.interface';
import { AlertService } from '../../../../shareds/services/alert.service';
import { AddlistService } from '../../../services/addlist.service';
import { Observable, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AuthenService } from 'src/app/services/authen.service';



@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./add-item.component.css'],
  providers: [AddlistService]
})
export class AddItemComponent implements OnInit,OnDestroy, IAddItemComponent {
 
  // myControl = new FormControl();
  //options: string[] = ['One', 'Two', 'Three'];
  filteredLists: Observable<IListItem[]>;
  private subscr: Subscription;
  
  ngOnInit(): void {
    this.onChanges();
    this.getActs();
  }

  ngOnDestroy(){
    this.subscr.unsubscribe();
  }


  constructor(
    private builder: FormBuilder,
    private alert: AlertService,
    private addlist: AddlistService,
    private authen: AuthenService
  ) {
    this.initailCreateFormData();
  }

  @Input('modalRef') modalRef: BsModalRef;
  @Output('listitem') listitem: EventEmitter<IListItem> = new EventEmitter();
  form: FormGroup;

  acts: IActItem[];
  types: ITypeItem[];
  lists: IListItem[];


  onSubmit(): void {
    let list = this.lists.find(list => list.description === this.form.controls.list.value);
    if (!list) {
      return this.alert.notify('ไม่พบรายการนี้');
    }

    list.type = this.types.find(type => type.id_type == this.form.controls.type.value).description;

    //console.log(list);
    this.listitem.emit(list);
  }



  // สร้ามฟอร์ม
  private initailCreateFormData() {
    this.form = this.builder.group({
      act: ['', Validators.required],
      type: ['', Validators.required],
      list: ['', Validators.required]
    });

    this.form.get('type').disable();
    this.form.get('list').disable();
  }

  getActs() {
    this.addlist
      .getActs(this.authen.getAuthenticated())
      .then(acts =>
        this.acts = acts
      )
      .catch(err =>
        this.alert.notify(err.Message));
  }


  onChanges() {
    this.subscr = this.form.get('act').valueChanges
      .subscribe(act => {
        if (act == '') {
          //this.form.get('type').reset();
          this.form.get('type').disable();
          this.form.get('list').disable();
        }
        else {
          this.getTypes(act);
          this.form.get('type').enable();
        }
      });


    this.form.get('type').valueChanges
      .subscribe(type => {
        if (type == '') {
          //this.form.get('list').reset();
          this.form.get('list').disable();
        }
        else {
          this.getLists(type);
          this.form.get('list').setValue('');
          this.form.get('list').enable();
        }
      });
  }

  getTypes(id_act: number) {
    this.addlist
      .getTypes(id_act,this.authen.getAuthenticated())
      .then(types => this.types = types)
      .catch(err => {
        this.alert.notify(err.Message)
        this.form.get('type').disable();
        this.form.get('type').setValue('');
        this.form.get('list').disable();
        this.form.get('list').setValue('');
      });
  }

  getLists(id_type: number) {
    this.addlist
      .getLists(id_type,this.authen.getAuthenticated())
      .then(lists => {
        this.lists = lists;

        this.filteredLists = this.form.get('list').valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );
      })
      .catch(err => {
        this.alert.notify(err.Message)
        this.form.get('list').disable();
        this.form.get('list').setValue('');
      });
  }

  private _filter(value: string): IListItem[] {
    const filterValue = value.toLowerCase();

    return this.lists.filter(list => list.description.toLowerCase().includes(filterValue));
  }

  onResetList() {
    this.form.get('list').setValue('');
  }

}
