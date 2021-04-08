import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: CustomersComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', loadChildren: () => import('./customer-list/customer-list.module').then(m => m.CustomerListModule) },
      { path: 'create', loadChildren: () => import('./customer-create-and-update/customer-create-and-update.module').then(m => m.CustomerCreateAndUpdateModule) },
      { path: 'update/:id', loadChildren: () => import('./customer-create-and-update/customer-create-and-update.module').then(m => m.CustomerCreateAndUpdateModule) },
    ]
  }
];

@NgModule({
  declarations: [
    CustomersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CustomersModule { }
