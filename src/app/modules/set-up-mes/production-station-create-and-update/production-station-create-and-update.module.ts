import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductionStationCreateAndUpdateComponent } from './production-station-create-and-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroupModule } from 'src/app/components/form-group/form-group.module';
import { BusyModule } from 'src/app/core/directives/busy.directive';


@NgModule({
  declarations: [
    ProductionStationCreateAndUpdateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FormGroupModule,
    ReactiveFormsModule,
    BusyModule
  ],
  exports: [
    ProductionStationCreateAndUpdateComponent
  ]
})
export class ProductionStationCreateAndUpdateModule { }
