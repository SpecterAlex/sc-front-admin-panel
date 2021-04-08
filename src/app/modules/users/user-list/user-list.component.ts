import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { IResponse, IUser } from 'src/app/core/interfaces/back-end.interface';
import { ListView } from '../../../classes/list-view';
import { CoreService } from '../../../core/services/core.service';
import { PathConstants } from '../../../core/path-constants/path-constants';
import { AlertService } from 'src/app/components/alert/services/alert.service';
import { IListPaginationData } from '../../../core/interfaces/back-end.interface';
import { combineLatest } from 'rxjs';
import { TableComponent } from '../../../components/table/table.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent extends ListView<IUser> implements OnInit, AfterViewInit {

  users: IUser[];

  @ViewChild(TableComponent, { static: false }) tableGroup: TableComponent;

  constructor(
    private coreService: CoreService,
    private alertService: AlertService,
  ) {
    super('user-list');
  }

  ngAfterViewInit(): void {
    combineLatest(
      [this.search.changes,
      this.tableGroup.pagination.changes]
    ).pipe(map(([searchString, pagination]) => ({ searchString, ...pagination }))).subscribe((params: any) => {
      const url = PathConstants.getPath(PathConstants.USERS);
      this.coreService.get(url, params).subscribe((usersReponse: IListPaginationData<IUser>) => {
        this.setList(usersReponse);
        this.list.map(user => {
          user._full_name = user.first_name + ' ' + user.last_name;
        });
      }, (error: any) => {
        this.alertService.error('Error al realizar la consulta', error);
      });
    });
  }

  ngOnInit(): void {
  }

}
