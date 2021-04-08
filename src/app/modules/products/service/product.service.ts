import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigConstants } from 'src/app/core/helpers/config.constants';
import { PathConstants } from '../../../core/path-constants/path-constants';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private httpClient: HttpClient
  ) { }

  createProduct(body): Observable<any> {
    const headers = {
      ...ConfigConstants.HEADERS_NOT_CATCH_ON_ERROR
    };
    const path = PathConstants.getPath(PathConstants.PRODUCTS);
    return this.httpClient.post(path, body, { reportProgress: true, observe: 'events', headers }).pipe(share());
  }

  updateProduct(productId: number, body): Observable<any> {
    const headers = {
      ...ConfigConstants.HEADERS_NOT_CATCH_ON_ERROR
    };
    const path = PathConstants.getPath(PathConstants.PRODUCT_UPDATE).replace('{productId}', productId.toString());
    return this.httpClient.post(path, body, { reportProgress: true, observe: 'events', headers }).pipe(share());
  }

  deleteProduct(productId: number): Observable<any> {
    const headers = {
      ...ConfigConstants.HEADERS_NOT_CATCH_ON_ERROR
    };
    const path = PathConstants.getPath(PathConstants.PRODUCT_DELETE).replace('{productId}', productId.toString());
    return this.httpClient.delete(path, { headers }).pipe(share());
  }

  getProduct(productId: number): Observable<any> {
    const headers = {
      ...ConfigConstants.HEADERS_NOT_CATCH_ON_ERROR
    };
    const path = PathConstants.getPath(PathConstants.PRODUCT_GET).replace('{productId}', productId.toString());
    return this.httpClient.get(path, { headers });
  }

}
