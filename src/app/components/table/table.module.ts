import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { TablePaginationModule } from '../table-pagination/table-pagination.module';
import { NoInfoModule } from '../no-info/no-info.module';



@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    TablePaginationModule,
    NoInfoModule
  ],
  exports: [
    TableComponent
  ]
})
export class TableModule { }
