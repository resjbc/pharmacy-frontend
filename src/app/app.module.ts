import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";

import { LoginComponent } from './components/login/login.component';
import { AppRouting } from './app.routing';
import { SharedsModule } from './shareds/shareds.module';
import { LocationStrategy, HashLocationStrategy, APP_BASE_HREF } from '@angular/common';
import { CustomHashLocationStrategyService } from './shareds/services/custom-hash-location-strategy.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

  ],
  imports: [
    BrowserAnimationsModule,
    AppRouting,
    SharedsModule,
    HttpClientModule,

  ],
  //providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy}],
  /*providers: [
    { provide: APP_BASE_HREF, useValue: '/kbs/' },
    { provide: LocationStrategy, useClass: CustomHashLocationStrategyService },
  ], //ng build --prod --base-href=./*/
  bootstrap: [AppComponent]
})
export class AppModule { }
