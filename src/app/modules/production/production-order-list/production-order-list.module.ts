import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductionOrderListComponent } from './production-order-list.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'src/app/components/table/table.module';

const routes: Routes = [
  { path: '', component: ProductionOrderListComponent }
];

@NgModule({
  declarations: [
    ProductionOrderListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ProductionOrderListModule { }
