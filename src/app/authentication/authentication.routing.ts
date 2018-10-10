import { Routes, RouterModule } from '@angular/router';
import { AuthURL } from './authentication.url';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { CreatePersonComponent } from './components/create-person/create-person.component';
import { SearchReceiptsComponent } from './components/search-receipts/search-receipts.component';
import { CreateActComponent } from './components/create-act/create-act.component';
import { CreateTypefeeComponent } from './components/create-typefee/create-typefee.component';
import { CreateListfeeComponent } from './components/create-listfee/create-listfee.component';



const RouterList: Routes = [
    { path: '', redirectTo: AuthURL.CreateOrder, pathMatch: 'full' },
    { path: AuthURL.CreateOrder, component: CreateOrderComponent },
    { path: AuthURL.CreatePerson, component: CreatePersonComponent },
    { path: AuthURL.CreateAct, component: CreateActComponent },
    { path: AuthURL.CreateTypeFee, component: CreateTypefeeComponent },
    { path: AuthURL.CreateListFee, component: CreateListfeeComponent },
    { path: AuthURL.SearchReceipts, 
        children: [
        { path: '', component: SearchReceiptsComponent  },
        { path: ':id_reference', component: SearchReceiptsComponent  }
    ] }
];

export const AuthenticationRouting = RouterModule.forChild(RouterList)