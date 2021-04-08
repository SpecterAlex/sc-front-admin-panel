import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(
    private httpClient: HttpClient,
  ) { }


  // generic methods
  public get(path, params?): Observable<any> {
    if (params) {
      Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);
    }
    return this.httpClient.get(path, {
      params,
    });
  }

  public post(path, body): Observable<any> {
    return this.httpClient.post(path, body).pipe(share());
  }

}
