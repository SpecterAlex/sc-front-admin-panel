import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { TablePaginationComponent } from '../table-pagination/table-pagination.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {

  @Input() context: any;
  @ViewChild(TablePaginationComponent, { static: false }) pagination: TablePaginationComponent;

  constructor() { }

  ngAfterViewInit(): void {
    this.pagination.changes.subscribe(result => {
      this.context.ekis = this.context.ekis ? this.context.ekis++ : 0;
    });
  }

}
