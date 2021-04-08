import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetUpMesListComponent } from './set-up-mes-list.component';
import { Routes, RouterModule } from '@angular/router';
import { TableModule } from 'src/app/components/table/table.module';
import { FormsModule } from '@angular/forms';
import { ProductionStationCreateAndUpdateModule } from '../production-station-create-and-update/production-station-create-and-update.module';
import { ProductionLineCreateAndUpdateModule } from '../production-line-create-and-update/production-line-create-and-update.module';
import { ProductionShiftCreateAndUpdateModule } from '../production-shift-create-and-update/production-shift-create-and-update.module';

const rotues: Routes = [
  { path: '', component: SetUpMesListComponent }
];

@NgModule({
  declarations: [
    SetUpMesListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(rotues),
    TableModule,
    FormsModule,
    ProductionLineCreateAndUpdateModule,
    ProductionStationCreateAndUpdateModule,
    ProductionShiftCreateAndUpdateModule
  ]
})
export class SetUpMesListModule { }
