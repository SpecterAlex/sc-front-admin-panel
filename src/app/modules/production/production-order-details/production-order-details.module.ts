import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductionOrderDetailsComponent } from './production-order-details.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ProductionOrderDetailsComponent }
];

@NgModule({
  declarations: [
    ProductionOrderDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductionOrderDetailsModule { }
