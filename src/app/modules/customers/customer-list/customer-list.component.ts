import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ListView } from 'src/app/classes/list-view';
import { PathConstants } from 'src/app/core/path-constants/path-constants';
import { ICustomer } from 'src/app/core/interfaces/back-end.interface';
import { TableComponent } from '../../../components/table/table.component';
import { CoreService } from '../../../core/services/core.service';
import { IListPaginationData } from '../../../core/interfaces/back-end.interface';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent extends ListView<ICustomer> implements OnInit, AfterViewInit {

  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  constructor(
    private coreService: CoreService,
  ) {
    super('customer-list');
  }

  ngAfterViewInit(): void {
    combineLatest(
      [this.search.changes, this.table.pagination.changes],
    ).pipe(map(([searchString, pagination]) => ({ searchString, ...pagination }))).subscribe((params: any) => {
      const url = PathConstants.getPath(PathConstants.CUSTOMERS);
      this.coreService.get(url, params).subscribe((customerResponse: IListPaginationData<ICustomer>) => {
        this.setList(customerResponse);
      });
    });
  }

  ngOnInit(): void {
  }

}
