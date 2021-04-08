import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolePermissionsService {

  constructor() { }

  public setRole(role: string): void {
    localStorage.setItem('role', role);
  }

  get isAdmin(): boolean {
    return localStorage.getItem('role').indexOf('ROLE_BACK_OFFICE_USER_ADMIN') > -1;
  }

  get isOperator(): boolean {
    return localStorage.getItem('role').indexOf('ROLE_BACK_OFFICE_USER_OPERATOR') > -1;
  }

  public getRolePermission(): IModule[] {
    switch (localStorage.getItem('role')) {
      case 'ROLE_BACK_OFFICE_USER_ADMIN':
        return this.getPermissionsForAdmin();
      case 'ROLE_BACK_OFFICE_USER_OPERATOR':
        return this.getPermissionsForOperator();
      default:
        return this.getPermissionsForAdmin();
    }
  }

  getPermissionsForOperator(): IModule[] {
    return [
      {
        id: 'production',
        showInMenu: true,
        isActive: true,
        title: 'Producción',
        routerLink: 'production',
        icon: 'fas fa-fw fa-city',
        actions: ['read'],
      },
    ];
  }

  getPermissionsForAdmin(): IModule[] {
    return [
       {
        id: 'dashboard',
        showInMenu: true,
        isActive: true,
        title: 'Dashboard',
        routerLink: 'dashboard',
        icon: 'fas fa-fw fa-tachometer-alt',
        actions: ['read', 'create', 'update', 'delete'],
      },
      {
        id: 'customers',
        showInMenu: true,
        isActive: true,
        title: 'Clientes',
        routerLink: 'customers',
        icon: 'fas fa-fw fa-address-book',
        actions: ['read', 'create', 'update', 'delete'],
      },
      {
        id: 'orders',
        showInMenu: true,
        isActive: true,
        title: 'Pedidos',
        routerLink: 'orders',
        icon: 'fas fa-clipboard-list',
        actions: ['read', 'create', 'update', 'delete'],
      },
      {
        id: 'production',
        showInMenu: true,
        isActive: true,
        title: 'Producción',
        routerLink: 'production',
        icon: 'fas fa-fw fa-city',
        actions: ['read', 'create', 'update', 'delete'],
      },
      {
        id: 'users',
        showInMenu: true,
        isActive: true,
        title: 'Usuarios',
        routerLink: 'users',
        icon: 'fas fa-fw fa-users',
        actions: ['read', 'create', 'update', 'delete'],
      },
      {
        id: 'products',
        showInMenu: true,
        isActive: true,
        title: 'Productos',
        routerLink: 'products',
        icon: 'fas fa-fw fa-cubes',
        actions: ['read', 'create', 'update', 'delete'],
      },
      {
        id: 'set-up',
        showInMenu: true,
        isActive: true,
        title: 'Setup',
        routerLink: 'set-up',
        icon: 'fas fa-fw fa-cogs',
        actions: ['read', 'create', 'update', 'delete'],
        subModules: [
          {
            id: 'lines',
            showInMenu: true,
            isActive: true,
            title: 'Lineas',
            routerLink: 'lines',
            icon: 'fas fa-fw fa-cog',
            actions: ['read', 'create', 'update', 'delete'],
          },
          {
            id: 'stations',
            showInMenu: true,
            isActive: true,
            title: 'Estaciones',
            routerLink: 'stations',
            icon: 'fas fa-fw fa-cog',
            actions: ['read', 'create', 'update', 'delete'],
          },
          {
            id: 'shifts',
            showInMenu: true,
            isActive: true,
            title: 'Turnos',
            routerLink: 'shifts',
            icon: 'fas fa-fw fa-cog',
            actions: ['read', 'create', 'update', 'delete'],
          },
        ]
      },
    ];
  }
}

export interface IModule {
  id: string;
  showInMenu: boolean;
  isActive: boolean;
  title: string;
  routerLink: string;
  icon: string;
  actions: string[];
  subModules?: IModule[];
}
