
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/components/alert/services/alert.service';
import { AuthService } from '../services/auth.service';


import { RolePermissionsService } from '../services/role-permissions.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    private rolePermissionsService: RolePermissionsService,
    private alertService: AlertService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.validateAcces(route.routeConfig.path);
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.validateAcces(route.path);
  }

  private validateAcces(path: string): boolean {
    const navBarOptions = this.rolePermissionsService.getRolePermission();
    if (this.authService.isLogin()) {
      if (navBarOptions.length > 0) {
        let navBarOption;
        for (const module of navBarOptions) {
          if (module.isActive) {
            if (module.routerLink === path) {
              navBarOption = module;
              break;
            } else if (module.subModules) {
              navBarOption = module.subModules.find(subModule => subModule.routerLink === path && subModule.isActive);
              if (navBarOption) {
                break;
              }
            }
          }
        }
        if (!navBarOption) {
          this.router.navigate(['/app/' + navBarOptions[0].routerLink]);
          return false;
        }
        return true;
      } else {
        this.alertService.error('No cuentas con acceso configurado.');
        this.authService.clearSession();
        this.router.navigate(['/sign-in']);
        return false;
      }

    } else {
      this.router.navigate(['/sign-in']);
      return false;
    }
  }
}
