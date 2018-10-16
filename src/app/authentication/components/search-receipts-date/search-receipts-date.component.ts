import { Component, OnInit, ViewChild } from '@angular/core';
import { AppURL } from 'src/app/app.url';
import { AuthURL } from '../../authentication.url';
import * as dateformat from 'dateformat';
import { IReceiptDate, ISearchReceiptDateComponent } from './search-receipts-date.interface';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { ReceiptService } from '../../services/receipt.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { AuthenService } from 'src/app/services/authen.service';


@Component({
  selector: 'app-search-receipts-date',
  templateUrl: './search-receipts-date.component.html',
  styleUrls: ['./search-receipts-date.component.css']
})
export class SearchReceiptsDateComponent implements OnInit, IReceiptDate {


  myDateStart: any;
  myDateEnd: any;


  displayedColumns: string[] = ['id_reference', 'date_created', 'cid', 'firstname', 'lastname','id_receipt_cash','id_receipt_cash_number', 'print'];
  dataSource: MatTableDataSource<ISearchReceiptDateComponent>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  AppURL = AppURL;
  AuthURL = AuthURL;


  constructor(
    private alert: AlertService,
    private receiptService: ReceiptService,
    private router: Router,
    private authen: AuthenService
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.myDateStart = localStorage.getItem('myDateStart');
    this.myDateEnd = localStorage.getItem('myDateEnd');

    if (this.myDateStart && this.myDateEnd) {
      this.onDateStart(this.myDateStart);
      this.onDateEnd(this.myDateEnd);
      this.SearchReceiptDate();
    }

  }



  onDateStart(Start) {
    //console.log(Start.value)
    this.myDateStart = dateformat(Start, "isoDate");
  }

  onDateEnd(End) {
    this.myDateEnd = dateformat(End, "isoDate");
  }

  SearchReceiptDate() {
    if (!this.myDateStart || !this.myDateEnd) {
      return this.alert.notify("เลือกวันที่");
    }
    this.receiptService.findReceiptDate(
      {
        myDateStart: this.myDateStart,
        myDateEnd: this.myDateEnd
      },
      this.authen.getAuthenticated()
    ).then(receipts => {
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
      //this.dataSource = null;

    });
    //console.log(this.myDateStart, this.myDateEnd);
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
    localStorage.setItem('myDateStart', this.myDateStart);
    localStorage.setItem('myDateEnd', this.myDateEnd);
    this.router.navigate(['',
      AppURL.Authen, AuthURL.SearchReceipts,
      { id_reference: id_reference }
    ]);
  }



}
