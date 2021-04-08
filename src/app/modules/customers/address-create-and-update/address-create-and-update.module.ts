import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressCreateAndUpdateComponent } from './address-create-and-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroupModule } from 'src/app/components/form-group/form-group.module';



@NgModule({
  declarations: [
    AddressCreateAndUpdateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FormGroupModule
  ],
  exports: [
    AddressCreateAndUpdateComponent
  ],
})
export class AddressCreateAndUpdateModule { }
