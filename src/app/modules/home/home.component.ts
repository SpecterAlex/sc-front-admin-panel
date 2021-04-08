import { Component, OnInit, ViewChild } from '@angular/core';
import { INavLink } from 'src/app/core/interfaces/back-end.interface';
import { AuthService } from '../../core/services/auth.service';
import { AlertService } from 'src/app/components/alert/services/alert.service';
import { RolePermissionsService } from '../../core/services/role-permissions.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  sidebarLinks: INavLink[] = [];
  navLinks: INavLink[] = [];

  userName: string;

  @ViewChild(SidebarComponent) sidebarComponent: SidebarComponent;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private rolePermissionsService: RolePermissionsService
  ) {

    const rolePermissions = this.rolePermissionsService.getRolePermission();

    const data = this.authService.getToken();
    this.userName = data.user.first_name;

    for (const rolePermission of rolePermissions) {

      if (rolePermission.showInMenu) {
        const navLink = {
          id: rolePermission.id,
          title: rolePermission.title,
          routerLink: rolePermission.routerLink,
          icon: rolePermission.icon,
          navLinks: undefined,
        };

        if (rolePermission.subModules) {
          const subModuleEnabled = rolePermission.subModules.filter(subModule => subModule.showInMenu);
          if (subModuleEnabled.length > 0) {
            navLink.navLinks = [];
            for (const subModule of subModuleEnabled) {
              navLink.navLinks.push({
                id: subModule.id,
                title: subModule.title,
                routerLink: subModule.routerLink,
                icon: subModule.icon,
              });
            }
          }
        }
        this.sidebarLinks.push(navLink);
      }
    }
  }

  ngOnInit(): void {
  }

  onLogout(): void {
    this.authService.closeSession().subscribe((closeSession: any) => {
      this.authService.logout();
    }, (error: any) => {
      this.alertService.error('Error al cerrar sesión', error);
    });
  }

  onSidebarAction(): void {
    this.sidebarComponent.onHideOrShowSidebar();
  }

}
