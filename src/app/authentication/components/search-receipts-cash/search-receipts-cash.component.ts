import { Component, OnInit, ViewChild } from '@angular/core';
import { AppURL } from 'src/app/app.url';
import { AuthURL } from '../../authentication.url';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ISearchReceiptDateComponent } from '../search-receipts-date/search-receipts-date.interface';
import { Router } from '@angular/router';
import { ReceiptService } from '../../services/receipt.service';
import { AuthenService } from 'src/app/services/authen.service';

@Component({
  selector: 'app-search-receipts-cash',
  templateUrl: './search-receipts-cash.component.html',
  styleUrls: ['./search-receipts-cash.component.css']
})
export class SearchReceiptsCashComponent implements OnInit {

  AppURL = AppURL;
  AuthURL = AuthURL;
  form: FormGroup;

  receipt_cash: ISearchReceiptCash = null;


  displayedColumns: string[] = ['id_reference', 'date_created', 'cid', 'firstname', 'lastname', 'id_receipt_cash', 'id_receipt_cash_number', 'print'];
  dataSource: MatTableDataSource<ISearchReceiptDateComponent>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private alert: AlertService,
    private build: FormBuilder,
    private router: Router,
    private receiptService: ReceiptService,
    private authen: AuthenService
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.initialCreateFormData();
  }

  initialCreateFormData() {
    this.form = this.build.group({
      id_receipt_cash: [{ value: '', disabled: false }, [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      id_receipt_cash_number: [{ value: '', disabled: false }, [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    });
  }

  onSearchReceiptCash() {
    if (this.form.invalid || (!this.form.controls.id_receipt_cash.value && !this.form.controls.id_receipt_cash_number.value)) return this.alert.someting_wrong();

    this.receipt_cash = this.form.value;

    this.receiptService.findReceiptCash(this.receipt_cash,this.authen.getAuthenticated()).then(receipts => {
      if (receipts.length <= 0) {
        //this.dataSource = null;
        return this.alert.notify("ไม่พบข้อมูล");
      }

      this.dataSource = new MatTableDataSource(receipts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return this.nestedFilterCheck(currentTerm, data, key);
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        // Transform the filter by converting it to lowercase and removing whitespace.
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

    }).catch(err => {
      this.alert.notify(err.Message);
      this.dataSource = null;
    });
  }

  nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  YearThai(year: any) {
    return parseInt(year) + 543;
  }

  onReceiptDetail(id_reference) {
    this.router.navigate(['',
      AppURL.Authen, AuthURL.SearchReceipts,
      { id_reference: id_reference }
    ]);
  }
}

export interface ISearchReceiptCash {
  id_receipt_cash?: any;
  id_receipt_cash_number?: any;
}
