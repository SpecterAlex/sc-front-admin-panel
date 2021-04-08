import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { TableComponent } from 'src/app/components/table/table.component';
import { PathConstants } from 'src/app/core/path-constants/path-constants';
import { CoreService } from 'src/app/core/services/core.service';
import { ListView } from '../../../classes/list-view';
import { IProductionLine, IListPaginationData, IProductionStation, IConfigPage } from '../../../core/interfaces/back-end.interface';
import { ProductionLineCreateAndUpdateComponent } from '../production-line-create-and-update/production-line-create-and-update.component';
import { ProductionStationCreateAndUpdateComponent } from '../production-station-create-and-update/production-station-create-and-update.component';
import { ProductionShiftCreateAndUpdateComponent } from '../production-shift-create-and-update/production-shift-create-and-update.component';


const ConfigurationPages: IConfigPage[] = [
  {
    id: 'lines',
    title: 'Lineas',
    titleList: 'Listado de lineas de produccón',
    titleButtonAdd: 'Nueva linea',
    linkCreate: '../create-line',
    linkUpdate: '../update-line/',
    urlFetchInfo: PathConstants.getPath(PathConstants.PRODUCTION_LINES),
  },
  {
    id: 'stations',
    title: 'Estaciones',
    titleList: 'Listado de estaciones de trabajo',
    titleButtonAdd: 'Nueva estación',
    linkCreate: '../create-station',
    linkUpdate: '../update-station/',
    urlFetchInfo: PathConstants.getPath(PathConstants.PRODUCTION_STATIONS),
  },
  {
    id: 'shifts',
    title: 'Turnos',
    titleList: 'Listado de turnos',
    titleButtonAdd: 'Nuevo Turno',
    linkCreate: '../create-shifts',
    linkUpdate: '../update-shifts/',
    urlFetchInfo: PathConstants.getPath(PathConstants.PRODUCTION_SHIFTS),
  }
];

enum EPages {
  Lines = 'lines',
  Stations = 'stations',
  Shifts = 'shifts'
}


@Component({
  selector: 'app-set-up-mes-list',
  templateUrl: './set-up-mes-list.component.html',
  styleUrls: ['./set-up-mes-list.component.scss']
})
export class SetUpMesListComponent extends ListView<IProductionLine> implements OnInit, AfterViewInit {

  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  pages = ConfigurationPages;
  currentPage: IConfigPage;

  EPages = EPages;

  @ViewChild(ProductionLineCreateAndUpdateComponent) productionLine: ProductionLineCreateAndUpdateComponent;
  @ViewChild(ProductionStationCreateAndUpdateComponent) productionStation: ProductionStationCreateAndUpdateComponent;
  @ViewChild(ProductionShiftCreateAndUpdateComponent) productionShift: ProductionShiftCreateAndUpdateComponent;

  constructor(
    private route: Router,
    private coreService: CoreService,
  ) {
    super('set-up-mes-list');
  }

  ngOnInit(): void {
    const pagex = this.route.url.split('/')[2];
    this.currentPage = this.pages.find(page => page.id === pagex);
  }

  ngAfterViewInit(): void {
    combineLatest(
      [this.search.changes, this.table.pagination.changes],
    ).pipe(map(([searchString, pagination]) => ({ searchString, ...pagination }))).subscribe((params: any) => {
      const path = this.currentPage.urlFetchInfo;
      this.coreService.get(path, params).subscribe(
        (response: IListPaginationData<IProductionLine> | IListPaginationData<IProductionStation>) => {
          this.setList(response);
        });
    });
  }

  onCreate(): void {
    switch (this.currentPage.id) {
      case this.EPages.Lines:
        this.productionLine.onCreateProductionLine();
        break;
      case this.EPages.Stations:
        this.productionStation.onCreateProductionStation();
        break;
      case this.EPages.Shifts:
        this.productionShift.onCreateProductionShift();
        break;
    }
  }

  onUpdate(id): void {
    switch (this.currentPage.id) {
      case this.EPages.Lines:
        this.productionLine.onEditProductionLine(id);
        break;
      case this.EPages.Stations:
        this.productionStation.onUpdateProductionStation(id);
        break;
      case this.EPages.Shifts:
        this.productionShift.onUpdateProductionShit(id);
        break;
    }
  }

  onRefreshList($event: boolean): void {
    this.search.change();
  }

}
