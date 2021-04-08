import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard } from 'src/app/core/guard/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => import('./../dashboard/dashboard.module').then(m => m.DashboardModule), canLoad: [AuthGuard], canActivate: [AuthGuard] },
      { path: 'users', loadChildren: () => import('./../users/users.module').then(m => m.UsersModule), canLoad: [AuthGuard], canActivate: [AuthGuard] },
      { path: 'customers', loadChildren: () => import('./../customers/customers.module').then(m => m.CustomersModule), canLoad: [AuthGuard], canActivate: [AuthGuard] },
      { path: 'production', loadChildren: () => import('./../production/production.module').then(m => m.ProductionModule), canLoad: [AuthGuard], canActivate: [AuthGuard] },
      { path: 'orders', loadChildren: () => import('./../orders/orders.module').then(m => m.OrdersModule), canLoad: [AuthGuard], canActivate: [AuthGuard] },
      { path: 'products', loadChildren: () => import('./../products/products.module').then(m => m.ProductsModule), canLoad: [AuthGuard], canActivate: [AuthGuard] },
      { path: 'lines', loadChildren: () => import('./../set-up-mes/set-up-mes.module').then(m => m.SetUpMesModule), canLoad: [AuthGuard], canActivate: [AuthGuard] },
      { path: 'stations', loadChildren: () => import('./../set-up-mes/set-up-mes.module').then(m => m.SetUpMesModule), canLoad: [AuthGuard], canActivate: [AuthGuard] },
      { path: 'shifts', loadChildren: () => import('./../set-up-mes/set-up-mes.module').then(m => m.SetUpMesModule), canLoad: [AuthGuard], canActivate: [AuthGuard] }
    ]
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class HomeRoutingModule { }
