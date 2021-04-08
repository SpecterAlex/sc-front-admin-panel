import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ILogin } from '../interfaces/back-end.interface';


@Injectable({
    providedIn: 'root'
})
export class BasicHttpInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService,
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.headers.get('no-auth') === 'true') {
            return next.handle(req);
        }

        const token: ILogin = this.authService.getToken();
        if (!token) {
            this.authService.setError('No existe una sesión.');
        }
        else {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token.access_token}`
                }
            });

            // if (token._refreshDate <= new Date().getTime()) {
            //     this.authService.refreshToken();
            // }
        }
        return next.handle(req);
    }
}
