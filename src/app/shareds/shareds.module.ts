import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthContentComponent } from './components/auth-content/auth-content.component';
import { AuthNavbarComponent } from './components/auth-navbar/auth-navbar.component';
import { AuthSidebarComponent } from './components/auth-sidebar/auth-sidebar.component';
import { BsDropdownModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BsDropdownModule.forRoot(),
  ],
  declarations: [
    AuthContentComponent,
    AuthNavbarComponent,
    AuthSidebarComponent
  ],
  exports: [
    AuthContentComponent,
    AuthNavbarComponent,
    AuthSidebarComponent,
    BsDropdownModule
  ]
})
export class SharedsModule { }
