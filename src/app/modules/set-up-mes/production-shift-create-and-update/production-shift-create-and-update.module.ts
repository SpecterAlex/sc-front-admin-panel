import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductionShiftCreateAndUpdateComponent } from './production-shift-create-and-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroupModule } from '../../../components/form-group/form-group.module';
import { BusyModule } from 'src/app/core/directives/busy.directive';



@NgModule({
  declarations: [
    ProductionShiftCreateAndUpdateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormGroupModule,
    BusyModule
  ],
  exports: [
    ProductionShiftCreateAndUpdateComponent
  ]
})
export class ProductionShiftCreateAndUpdateModule { }
