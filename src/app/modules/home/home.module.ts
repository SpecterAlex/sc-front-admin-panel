import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeRoutingModule } from './home-routing.module';
import { SidebarModule } from '../../components/sidebar/sidebar.module';
import { AlertModule } from 'src/app/components/alert/alert.module';
import { AlertService } from 'src/app/components/alert/services/alert.service';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NavbarModule,
    SidebarModule,
    AlertModule
  ],
  exports: [
    NavbarModule,
    SidebarModule,
    HttpClientModule,
  ],
  providers: [
    AlertService
  ]
})
export class HomeModule { }
