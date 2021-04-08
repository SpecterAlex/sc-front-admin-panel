import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable, Subscription } from 'rxjs';
import { ConfigConstants } from '../helpers/config.constants';
import { PathConstants } from '../path-constants/path-constants';
import { ILogin } from '../interfaces/back-end.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  error: string;
  public $logout = new Subject();

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  public login(body): Observable<any> {
    const headers = {
      ...ConfigConstants.HEADERS_NO_AUTH,
      ...ConfigConstants.HEADERS_NOT_CATCH_ON_ERROR,
    };
    const url = PathConstants.getPath(PathConstants.LOGIN);
    return this.httpClient.post(url, body, {
      headers,
    });
  }

  public isLogin(): boolean {
    const token = this.getToken();
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  public recoveryPassword(body): Observable<any> {
    const headers = {
      ...ConfigConstants.HEADERS_NO_AUTH,
      ...ConfigConstants.HEADERS_NOT_CATCH_ON_ERROR,
    };
    const url = PathConstants.getPath(PathConstants.RECOVERY_PASSWORD);
    return this.httpClient.post(url, body, {
      headers,
    });
  }

  public changePassword(body, token): Observable<any> {
    const headers = {
      ...ConfigConstants.HEADERS_NO_AUTH,
      ...ConfigConstants.HEADERS_NOT_CATCH_ON_ERROR,
      Authorization: `Recovery ${token}`
    };
    const url = PathConstants.getPath(PathConstants.CHANGE_PASSWORD);
    return this.httpClient.post(url, body, { headers });
  }

  public logout(): void {
    this.$logout.next(true);
    this.clearSession();
    this.router.navigate(['/sign-in']);
  }

  public clearSession(): void {
    localStorage.clear();
  }

  public setToken(token: ILogin): void {
    localStorage.setItem('token', JSON.stringify(token));
  }

  public getToken(): ILogin {
    return JSON.parse(localStorage.getItem('token'));
  }

  public closeSession(): Observable<any> {
    const headers = {
      ...ConfigConstants.HEADERS_NOT_CATCH_ON_ERROR,
    };
    const url = PathConstants.getPath(PathConstants.CLOSE_SESSION);
    return this.httpClient.get(url, {
      headers,
    });
  }

  // error support
  public getError(): string {
    return this.error;
  }

  public setError(error: string): void {
    this.error = error;
  }

  public clearError(): void {
    this.error = undefined;
  }

  public httpErrorResponseHandler(error: any): boolean {
    if (error.status === 404) {
      this.setError('Error inesperado, intente más tarde.');
      return false;
    } else {
      this.setError(error.error.message);
      return false;
    }
  }

}
