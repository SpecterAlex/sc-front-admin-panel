import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: OrdersComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', loadChildren: () => import('./order-list/order-list.module').then(m => m.OrderListModule) },
      { path: 'details/:id', loadChildren: () => import('./order-details/order-details.module').then(m => m.OrderDetailsModule) },
      { path: 'consolidation', loadChildren: () => import('./order-consolidation/order-consolidation.module').then(m => m.OrderConsolidationModule) }
    ]
  }
];

@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class OrdersModule { }
