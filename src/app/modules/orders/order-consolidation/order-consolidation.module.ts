import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderConsolidationComponent } from './order-consolidation.component';
import { RouterModule, Routes } from '@angular/router';
import { LabelGroupModule } from '../../../components/label-group/label-group.module';

const routes: Routes = [
  { path: '', component: OrderConsolidationComponent }
];

@NgModule({
  declarations: [
    OrderConsolidationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LabelGroupModule
  ]
})
export class OrderConsolidationModule { }
