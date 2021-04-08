import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { TableComponent } from 'src/app/components/table/table.component';
import { PathConstants } from 'src/app/core/path-constants/path-constants';
import { ListView } from '../../../classes/list-view';
import { IOrder, IResponse } from '../../../core/interfaces/back-end.interface';
import { CoreService } from '../../../core/services/core.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent extends ListView<IOrder> implements OnInit, AfterViewInit {

  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  constructor(
    private coreService: CoreService
  ) {
    super('order-list');
  }

  ngAfterViewInit(): void {
    // combineLatest(
    //   [this.search.changes, this.table.pagination.changes],
    // ).pipe(map(([searchString, pagination]) => ({ searchString, ...pagination }))).subscribe((params: any) => {
    //   const url = PathConstants.getPath(PathConstants.ORDERS);
    //   this.coreService.get(url, params).subscribe((customerResponse: IResponse<IOrder>) => {
    //     this.setList(customerResponse.data);
    //   });
    // });
  }

  ngOnInit(): void {
  }

}
