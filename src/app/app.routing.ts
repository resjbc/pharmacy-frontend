import { Routes, RouterModule } from '@angular/router';
import { AppURL } from './app.url';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { UnauthenticationGuard } from './guards/unauthentication.guard';

const RouterList: Routes = [
    { path: '', redirectTo: AppURL.Login, pathMatch: 'full' },
    { path: AppURL.Login, component: LoginComponent, canActivate: [UnauthenticationGuard] },
    {
        path: AppURL.Authen, loadChildren: './authentication/authentication.module#AuthenticationModule',
        canActivate: [AuthenticationGuard]
    }
];

export const AppRouting = RouterModule.forRoot(RouterList)