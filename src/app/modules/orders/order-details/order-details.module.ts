import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailsComponent } from './order-details.component';
import { Routes, RouterModule } from '@angular/router';
import { LabelGroupModule } from '../../../components/label-group/label-group.module';

const routes: Routes = [
  { path: '', component: OrderDetailsComponent }
];

@NgModule({
  declarations: [
    OrderDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LabelGroupModule
  ]
})
export class OrderDetailsModule { }
