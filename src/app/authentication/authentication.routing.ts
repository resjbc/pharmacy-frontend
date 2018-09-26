import { Routes, RouterModule } from '@angular/router';
import { AuthURL } from './authentication.url';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { CreatePersonComponent } from './components/create-person/create-person.component';



const RouterList: Routes = [
    { path: '', redirectTo: AuthURL.CreateOrder, pathMatch: 'full' },
    { path: AuthURL.CreateOrder, component: CreateOrderComponent },
    { path: AuthURL.CreatePerson, component: CreatePersonComponent }
];

export const AuthenticationRouting = RouterModule.forChild(RouterList)