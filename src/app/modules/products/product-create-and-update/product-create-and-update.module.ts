import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCreateAndUpdateComponent } from './product-create-and-update.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroupModule } from '../../../components/form-group/form-group.module';
import { InputRestrictionModule } from 'src/app/core/directives/input-restriction.directive';
import { BusyModule } from 'src/app/core/directives/busy.directive';

const routes: Routes = [
  { path: '', component: ProductCreateAndUpdateComponent }
];

@NgModule({
  declarations: [
    ProductCreateAndUpdateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    FormGroupModule,
    InputRestrictionModule,
    BusyModule
  ]
})
export class ProductCreateAndUpdateModule { }
