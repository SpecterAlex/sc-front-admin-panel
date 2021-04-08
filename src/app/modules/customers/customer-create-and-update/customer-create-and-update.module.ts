import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerCreateAndUpdateComponent } from './customer-create-and-update.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormGroupModule } from '../../../components/form-group/form-group.module';
import { InputRestrictionModule } from '../../../core/directives/input-restriction.directive';
import { AddressCreateAndUpdateModule } from '../address-create-and-update/address-create-and-update.module';
import { BusyModule } from 'src/app/core/directives/busy.directive';

const routes: Routes = [
  { path: '', component: CustomerCreateAndUpdateComponent }
];

@NgModule({
  declarations: [
    CustomerCreateAndUpdateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    FormGroupModule,
    InputRestrictionModule,
    AddressCreateAndUpdateModule,
    BusyModule
  ]
})
export class CustomerCreateAndUpdateModule { }
