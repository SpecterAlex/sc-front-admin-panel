import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductionLineCreateAndUpdateComponent } from './production-line-create-and-update.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormGroupModule } from 'src/app/components/form-group/form-group.module';
import { BusyModule } from 'src/app/core/directives/busy.directive';

@NgModule({
  declarations: [
    ProductionLineCreateAndUpdateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormGroupModule,
    FormsModule,
    BusyModule
  ],
  exports: [
    ProductionLineCreateAndUpdateComponent
  ]
})
export class ProductionLineCreateAndUpdateModule { }
