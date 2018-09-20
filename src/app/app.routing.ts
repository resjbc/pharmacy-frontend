import { Routes, RouterModule } from '@angular/router';
import { AppURL } from './app.url';
import { LoginComponent } from './components/login/login.component';

const RouterList: Routes = [
    { path: '', redirectTo: AppURL.Login, pathMatch: 'full' },
    { path: AppURL.Login, component: LoginComponent },
    { path: AppURL.Authen, loadChildren: './authentication/authentication.module#AuthenticationModule' }
];

export const AppRouting = RouterModule.forRoot(RouterList)