import { Routes, RouterModule } from '@angular/router';
import { AuthURL } from './authentication.url';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { CreatePersonComponent } from './components/create-person/create-person.component';
import { SearchReceiptsComponent } from './components/search-receipts/search-receipts.component';
import { CreateActComponent } from './components/create-act/create-act.component';
import { CreateTypefeeComponent } from './components/create-typefee/create-typefee.component';
import { CreateListfeeComponent } from './components/create-listfee/create-listfee.component';
import { SearchReceiptsDateComponent } from './components/search-receipts-date/search-receipts-date.component';
import { SearchReceiptsPersonComponent } from './components/search-receipts-person/search-receipts-person.component';
import { SearchReceiptsCashComponent } from './components/search-receipts-cash/search-receipts-cash.component';
import { AddMemberComponent } from './components/add-member/add-member.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserRoleGuard } from '../guards/user-role.guard';
import { IRoleAccount } from '../components/login/login.interface';



const RouterList: Routes = [
    { path: '', redirectTo: AuthURL.SearchReceipts, pathMatch: 'full' },
    { 
        path: AuthURL.CreateOrder, 
        component: CreateOrderComponent ,
        canActivate: [UserRoleGuard] ,
        data: { roles: [IRoleAccount.Admin , IRoleAccount.เจ้าหน้าที่คปส ]}
    },
    { path: AuthURL.Profile, component: ProfileComponent },
    { 
        path: AuthURL.AddMember, 
        component: AddMemberComponent ,
        canActivate: [UserRoleGuard],
        data: { roles: [IRoleAccount.Admin]}
    },
    { 
        path: AuthURL.CreatePerson, 
        component: CreatePersonComponent ,
        canActivate: [UserRoleGuard],
        data: { roles: [IRoleAccount.Admin , IRoleAccount.เจ้าหน้าที่คปส ]}
    },
    { 
        path: AuthURL.CreateAct, 
        component: CreateActComponent ,
        canActivate: [UserRoleGuard],
        data: { roles: [IRoleAccount.Admin , IRoleAccount.เจ้าหน้าที่คปส ]}
    },
    { 
        path: AuthURL.CreateTypeFee, 
        component: CreateTypefeeComponent ,
        canActivate: [UserRoleGuard],
        data: { roles: [IRoleAccount.Admin , IRoleAccount.เจ้าหน้าที่คปส ]}
    },
    { 
        path: AuthURL.CreateListFee, 
        component: CreateListfeeComponent ,
        canActivate: [UserRoleGuard],
        data: { roles: [IRoleAccount.Admin , IRoleAccount.เจ้าหน้าที่คปส ]}
    },
    { path: AuthURL.SearchReceipts, 
        children: [
        { path: '', component: SearchReceiptsComponent  },
        { path: ':id_reference', component: SearchReceiptsComponent  }
    ] },
    { path: AuthURL.SearchReceiptsCash, component: SearchReceiptsCashComponent },
    { path: AuthURL.SearchReceiptsDate, component: SearchReceiptsDateComponent },
    { path: AuthURL.SearchReceiptsPerson, component: SearchReceiptsPersonComponent }
];

export const AuthenticationRouting = RouterModule.forChild(RouterList)