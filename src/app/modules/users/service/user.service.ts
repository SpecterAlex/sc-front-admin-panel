import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { ConfigConstants } from 'src/app/core/helpers/config.constants';
import { PathConstants } from 'src/app/core/path-constants/path-constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  createUser(body): Observable<any> {
    const headers = {
      ...ConfigConstants.HEADERS_NOT_CATCH_ON_ERROR,
    };
    const path = PathConstants.getPath(PathConstants.USERS);
    return this.httpClient.post(path, body, { headers }).pipe(share());
  }

  updateUser(userId, body): Observable<any> {
    const headers = {
      ...ConfigConstants.HEADERS_NOT_CATCH_ON_ERROR,
    };
    const path = PathConstants.getPath(PathConstants.USER_UPDATE).replace('{userId}', userId.toString());
    return this.httpClient.put(path, body, { headers }).pipe(share());
  }

  getUser(userId): Observable<any> {
    const headers = {
      ...ConfigConstants.HEADERS_NOT_CATCH_ON_ERROR
    };
    const path = PathConstants.getPath(PathConstants.USER_GET).replace('{userId}', userId.toString());
    return this.httpClient.get(path, { headers });
  }

  deleteUser(userId): Observable<any> {
    const headers = {
      ...ConfigConstants.HEADERS_NOT_CATCH_ON_ERROR
    };
    const path = PathConstants.getPath(PathConstants.USER_DELETE).replace('{userId}', userId.toString());
    return this.httpClient.delete(path, { headers }).pipe(share());
  }

}
