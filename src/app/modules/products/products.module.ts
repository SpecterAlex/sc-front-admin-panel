import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: ProductsComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', loadChildren: () => import('./product-list/product-list.module').then(m => m.ProductListModule) },
      { path: 'create', loadChildren: () => import('./product-create-and-update/product-create-and-update.module').then(m => m.ProductCreateAndUpdateModule) },
      { path: 'update/:id', loadChildren: () => import('./product-create-and-update/product-create-and-update.module').then(m => m.ProductCreateAndUpdateModule) },
    ]
  }
];

@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductsModule { }
