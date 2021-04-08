import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { ConfigConstants } from '../../../core/helpers/config.constants';
import { PathConstants } from 'src/app/core/path-constants/path-constants';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private httpClient: HttpClient
  ) { }

  createCustomer(body): Observable<any> {
    const headers = {
      ...ConfigConstants.HEADERS_NOT_CATCH_ON_ERROR
    };
    const path = PathConstants.getPath(PathConstants.CUSTOMERS);
    console.log(body);
    return this.httpClient.post(path, body, { headers }).pipe(share());
  }

  updateCustomer(customerId, body): Observable<any> {
    const headers = {
      ...ConfigConstants.HEADERS_NOT_CATCH_ON_ERROR
    };
    const path = PathConstants.getPath(PathConstants.CUSTOMER_UPDATE).replace('{customerId}', customerId.toString());
    return this.httpClient.put(path, body, { headers }).pipe(share());
  }

  deleteCustomer(customerId): Observable<any> {
    const headers = {
      ...ConfigConstants.HEADERS_NOT_CATCH_ON_ERROR
    };
    const path = PathConstants.getPath(PathConstants.CUSTOMER_DELETE).replace('{customerId}', customerId.toString());
    return this.httpClient.delete(path, { headers }).pipe(share());
  }

  getCustomer(customerId): Observable<any> {
    const headers = {
      ...ConfigConstants.HEADERS_NOT_CATCH_ON_ERROR
    };
    const path = PathConstants.getPath(PathConstants.CUSTOMER_GET).replace('{customerId}', customerId.toString());
    return this.httpClient.get(path, { headers });
  }


  getSuburbs(zipCode: string): Observable<any> {
    const headers = {
      ...ConfigConstants.HEADERS_NOT_CATCH_ON_ERROR
    };
    const path = PathConstants.getPath(PathConstants.GET_SUBURBS).replace('{zipCode}', zipCode.toString());
    return this.httpClient.get(path, { headers });
  }

  createAddress(body): Observable<any> {
    const headers = {
      ...ConfigConstants.HEADERS_NOT_CATCH_ON_ERROR
    };
    const path = PathConstants.getPath(PathConstants.ADDRESSES);
    return this.httpClient.post(path, body, { headers }).pipe(share());
  }

  updateAddress(addressId: number, body): Observable<any> {
    const headers = {
      ...ConfigConstants.HEADERS_NOT_CATCH_ON_ERROR
    };
    const path = PathConstants.getPath(PathConstants.ADDRESS_UPDATE).replace('{addressId}', addressId.toString());
    return this.httpClient.put(path, body, { headers }).pipe(share());
  }

  deleteAddress(addressId: number): Observable<any> {
    const headers = {
      ...ConfigConstants.HEADERS_NOT_CATCH_ON_ERROR
    };
    const path = PathConstants.getPath(PathConstants.ADDRESS_DELETE).replace('{addressId}', addressId.toString());
    return this.httpClient.delete(path, { headers }).pipe(share());
  }

  getAddress(addressId: number): Observable<any> {
    const headers = {
      ...ConfigConstants.HEADERS_NOT_CATCH_ON_ERROR
    };
    const path = PathConstants.getPath(PathConstants.ADDRESS_GET).replace('{addressId}', addressId.toString());
    return this.httpClient.get(path, { headers });
  }

}
