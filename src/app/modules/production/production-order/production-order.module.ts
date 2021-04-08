import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductionOrderComponent } from './production-order.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ProductionOrderComponent }
];

@NgModule({
  declarations: [
    ProductionOrderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductionOrderModule { }
