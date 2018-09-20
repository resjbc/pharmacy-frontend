import { Routes, RouterModule } from '@angular/router';
import { AuthURL } from './authentication.url';
import { CreateOrderComponent } from './components/create-order/create-order.component';



const RouterList: Routes = [
    { path: '', redirectTo: AuthURL.CreateOrder, pathMatch: 'full' },
    { path: AuthURL.CreateOrder, component: CreateOrderComponent }
];

export const AuthenticationRouting = RouterModule.forChild(RouterList)