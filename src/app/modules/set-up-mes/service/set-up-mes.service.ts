import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigConstants } from 'src/app/core/helpers/config.constants';
import { PathConstants } from '../../../core/path-constants/path-constants';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SetUpMesService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  createProductionLine(body): Observable<any> {
    const headers = {
      ...ConfigConstants.HEADERS_NOT_CATCH_ON_ERROR
    };
    const path = PathConstants.getPath(PathConstants.PRODUCTION_LINES);
    return this.httpClient.post(path, body, { headers }).pipe(share());
  }

  updateProductionLine(productionLienId: number, body): Observable<any> {
    const headers = {
      ...ConfigConstants.HEADERS_NOT_CATCH_ON_ERROR
    };
    const path = PathConstants.getPath(PathConstants.PRODUCTION_LINE_UPDATE).replace('{productionLineId}', productionLienId.toString());
    return this.httpClient.put(path, body, { headers }).pipe(share());
  }

  deleteProductionLine(productionLienId: number): Observable<any> {
    const headers = {
      ...ConfigConstants.HEADERS_NOT_CATCH_ON_ERROR
    };
    const path = PathConstants.getPath(PathConstants.PRODUCTION_LINE_DELETE).replace('{productionLineId}', productionLienId.toString());
    return this.httpClient.delete(path, { headers }).pipe(share());
  }

  getProductionLine(productionLienId: number): Observable<any> {
    const headers = {
      ...ConfigConstants.HEADERS_NOT_CATCH_ON_ERROR
    };
    const path = PathConstants.getPath(PathConstants.PRODUCTION_LINE_GET).replace('{productionLineId}', productionLienId.toString());
    return this.httpClient.get(path, { headers });
  }

  // production stations

  createProductionStation(body): Observable<any> {
    const headers = {
      ...ConfigConstants.HEADERS_NOT_CATCH_ON_ERROR
    };
    const path = PathConstants.getPath(PathConstants.PRODUCTION_STATIONS);
    return this.httpClient.post(path, body, { headers }).pipe(share());
  }

  updateProductionStation(productionStationId: number, body): Observable<any> {
    const headers = {
      ...ConfigConstants.HEADERS_NOT_CATCH_ON_ERROR
    };
    const path = PathConstants.getPath(PathConstants.PRODUCTION_STATION_UPDATE).replace('{productionStationId}', productionStationId.toString());
    return this.httpClient.put(path, body, { headers }).pipe(share());
  }

  deleteProductionStation(productionStationId: number): Observable<any> {
    const headers = {
      ...ConfigConstants.HEADERS_NOT_CATCH_ON_ERROR
    };
    const path = PathConstants.getPath(PathConstants.PRODUCTION_STATION_DELETE).replace('{productionStationId}', productionStationId.toString());
    return this.httpClient.delete(path, { headers }).pipe(share());
  }

  getProductionStation(productionStationId: number): Observable<any> {
    const headers = {
      ...ConfigConstants.HEADERS_NOT_CATCH_ON_ERROR
    };
    const path = PathConstants.getPath(PathConstants.PRODUCTION_STATION_GET).replace('{productionStationId}', productionStationId.toString());
    return this.httpClient.get(path, { headers });
  }

  // production shifts

  createProductionShift(body): Observable<any> {
    const headers = {
      ...ConfigConstants.HEADERS_NOT_CATCH_ON_ERROR
    };
    const path = PathConstants.getPath(PathConstants.PRODUCTION_SHIFTS);
    return this.httpClient.post(path, body, { headers }).pipe(share());
  }

  updateProductionShift(productionShiftId: number, body): Observable<any> {
    const headers = {
      ...ConfigConstants.HEADERS_NOT_CATCH_ON_ERROR
    };
    const path = PathConstants.getPath(PathConstants.PRODUCTION_SHIFT_UPDATE).replace('{productionShiftId}', productionShiftId.toString());
    return this.httpClient.put(path, body, { headers }).pipe(share());
  }

  deleteProductionShift(productionShiftId: number): Observable<any> {
    const headers = {
      ...ConfigConstants.HEADERS_NOT_CATCH_ON_ERROR
    };
    const path = PathConstants.getPath(PathConstants.PRODUCTION_SHIFT_DELETE).replace('{productionShiftId}', productionShiftId.toString());
    return this.httpClient.delete(path, { headers }).pipe(share());
  }

  getProductionShift(productionShiftId: number): Observable<any> {
    const headers = {
      ...ConfigConstants.HEADERS_NOT_CATCH_ON_ERROR
    };
    const path = PathConstants.getPath(PathConstants.PRODUCTION_SHIFT_GET).replace('{productionShiftId}', productionShiftId.toString());
    return this.httpClient.get(path, { headers });
  }

}
