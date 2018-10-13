import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { AuthenticationRouting } from './authentication.routing';
import { SharedsModule } from '../shareds/shareds.module';
import { CreatePersonComponent } from './components/create-person/create-person.component';
import { AddItemComponent } from './components/create-order/add-item/add-item.component';
import { SearchReceiptsComponent } from './components/search-receipts/search-receipts.component';
import { CreateActComponent } from './components/create-act/create-act.component';
import { CreateTypefeeComponent } from './components/create-typefee/create-typefee.component';
import { CreateListfeeComponent } from './components/create-listfee/create-listfee.component';
import { SearchReceiptsDateComponent } from './components/search-receipts-date/search-receipts-date.component';
import { SearchReceiptsPersonComponent } from './components/search-receipts-person/search-receipts-person.component';
import { AddCashReferenceComponent } from './components/search-receipts/add-cash-reference/add-cash-reference.component';

@NgModule({
  imports: [
    CommonModule,
    AuthenticationRouting,
    SharedsModule,
  ],
  declarations: [
    CreateOrderComponent,
    CreatePersonComponent,
    AddItemComponent,
    SearchReceiptsComponent,
    CreateActComponent,
    CreateTypefeeComponent,
    CreateListfeeComponent,
    SearchReceiptsDateComponent,
    SearchReceiptsPersonComponent,
    AddCashReferenceComponent,
    
  ],
  /*providers: [
  AddlistService
  ]*/
})
export class AuthenticationModule { }
