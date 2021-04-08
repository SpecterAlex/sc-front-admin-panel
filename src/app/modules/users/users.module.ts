import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '', component: UsersComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', loadChildren: () => import('./user-list/user-list.module').then(m => m.UserListModule), },
      { path: 'create', loadChildren: () => import('./user-create-and-update/user-create-and-update.module').then(m => m.UserCreateAndUpdateModule) },
      { path: 'update/:id', loadChildren: () => import('./user-create-and-update/user-create-and-update.module').then(m => m.UserCreateAndUpdateModule) }
    ]
  }
];

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class UsersModule { }
