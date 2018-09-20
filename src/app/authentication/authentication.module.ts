import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { AuthenticationRouting } from './authentication.routing';
import { SharedsModule } from '../shareds/shareds.module';

@NgModule({
  imports: [
    CommonModule,
    AuthenticationRouting,
    SharedsModule,
  ],
  declarations: [
    CreateOrderComponent
  ]
})
export class AuthenticationModule { }
