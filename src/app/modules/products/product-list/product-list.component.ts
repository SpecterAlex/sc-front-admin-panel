import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { TableComponent } from 'src/app/components/table/table.component';
import { PathConstants } from 'src/app/core/path-constants/path-constants';
import { ListView } from '../../../classes/list-view';
import { IProduct, IResponse, IListPaginationData } from '../../../core/interfaces/back-end.interface';
import { CoreService } from '../../../core/services/core.service';
import { AlertService } from 'src/app/components/alert/services/alert.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent extends ListView<IProduct> implements OnInit, AfterViewInit {

  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  constructor(
    private coreService: CoreService,
    private alertService: AlertService
  ) {
    super('product-list');
  }

  ngAfterViewInit(): void {
    combineLatest(
      [this.search.changes, this.table.pagination.changes],
    ).pipe(map(([searchString, pagination]) => ({ searchString, ...pagination }))).subscribe((params: any) => {
      const url = PathConstants.getPath(PathConstants.PRODUCTS);
      this.coreService.get(url, params).subscribe((customerResponse: IListPaginationData<IProduct>) => {
        this.setList(customerResponse);
      });
    });
  }

  ngOnInit(): void {
  }

}
