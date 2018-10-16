import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ISearchReceiptDateComponent } from '../search-receipts-date/search-receipts-date.interface';
import { AppURL } from 'src/app/app.url';
import { AuthURL } from '../../authentication.url';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { Router } from '@angular/router';
import { ReceiptService } from '../../services/receipt.service';
import { AuthenService } from 'src/app/services/authen.service';

@Component({
  selector: 'app-search-receipts-person',
  templateUrl: './search-receipts-person.component.html',
  styleUrls: ['./search-receipts-person.component.css']
})
export class SearchReceiptsPersonComponent implements OnInit {

  displayedColumns: string[] = ['id_reference', 'date_created', 'cid', 'firstname', 'lastname','id_receipt_cash','id_receipt_cash_number','print'];
  dataSource: MatTableDataSource<ISearchReceiptDateComponent>;

  person_cid: string = "";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  AppURL = AppURL;
  AuthURL = AuthURL;

  constructor(
    private alert: AlertService,
    private router: Router,
    private receiptService: ReceiptService,
    private authen: AuthenService
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.person_cid = localStorage.getItem('cid');
    if (this.person_cid) {
      this.onSearchReceiptPerson(this.person_cid);
    }
  }


  onSearchReceiptPerson(pid: string) {
    if (!parseInt(pid) || !(pid.trim().length == 13)) {
      return this.alert.notify('ตรวจสอบหมายเลขบัตรประชาชน');
      
    }
   
    this.receiptService.findReceiptPerson(pid,this.authen.getAuthenticated()).then(receipts => {
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
    localStorage.setItem('cid', this.person_cid);
    this.router.navigate(['',
      AppURL.Authen, AuthURL.SearchReceipts,
      { id_reference: id_reference }
    ]);
  }
}
