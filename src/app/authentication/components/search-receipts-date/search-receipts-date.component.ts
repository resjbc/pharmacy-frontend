import { Component, OnInit } from '@angular/core';
import { AppURL } from 'src/app/app.url';
import { AuthURL } from '../../authentication.url';
import * as dateformat from 'dateformat';
import { ParamReceiptDate } from './search-receipts-date.interface';

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


  constructor() { }

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
      console.log("dd"); 
      return;
    }
    console.log(this.myDateStart , this.myDateEnd);
  }



}
