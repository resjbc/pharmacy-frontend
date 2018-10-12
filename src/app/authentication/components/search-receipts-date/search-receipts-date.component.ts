import { Component, OnInit } from '@angular/core';
import { AppURL } from 'src/app/app.url';
import { AuthURL } from '../../authentication.url';
import * as dateformat from 'dateformat';
import { ParamReceiptDate } from './search-receipts-date.interface';
import { AlertService } from 'src/app/shareds/services/alert.service';

@Component({
  selector: 'app-search-receipts-date',
  templateUrl: './search-receipts-date.component.html',
  styleUrls: ['./search-receipts-date.component.css']
})
export class SearchReceiptsDateComponent implements OnInit, ParamReceiptDate {

  myDateStart: any;
  myDateEnd: any;


  AppURL = AppURL;
  AuthURL = AuthURL;


  constructor(private alert : AlertService) { }

  ngOnInit() {
  }

  onDateStart(Start) {
    //console.log(Start.value)
    this.myDateStart = dateformat(Start.value, "isoDate");
  }

  onDateEnd(End) {
    this.myDateEnd = dateformat(End.value, "isoDate");
  }

  SearchReceiptDate() {
    if(!this.myDateStart || !this.myDateEnd) {
      return this.alert.notify("เลือกวันที่");
    }
    console.log(this.myDateStart , this.myDateEnd);
  }



}
