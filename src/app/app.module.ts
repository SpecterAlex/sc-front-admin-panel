import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicHttpInterceptor } from './core/helpers/basic-http.interceptor';
import { ErrorHttpInterceptor } from './core/helpers/error-http.interceptor';
import { ConfirmModule } from './components/confirm/confirm.module';
import { ConfirmService } from './components/confirm/services/confirm.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ConfirmModule
  ],
  exports: [
    ConfirmModule,
  ],
  providers: [
    ConfirmService,
    { provide: HTTP_INTERCEPTORS, useClass: BasicHttpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
