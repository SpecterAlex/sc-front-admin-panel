import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductionComponent } from './production.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: ProductionComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', loadChildren: () => import('./production-order-list/production-order-list.module').then(m => m.ProductionOrderListModule) },
      { path: 'details/:id', loadChildren: () => import('./production-order-details/production-order-details.module').then(m => m.ProductionOrderDetailsModule) },
      { path: 'production-order/:id', loadChildren: () => import('./production-order/production-order.module').then(m => m.ProductionOrderModule) }
    ]
  }
];

@NgModule({
  declarations: [
    ProductionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductionModule { }
