import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCreateAndUpdateComponent } from './user-create-and-update.component';
import { Routes, RouterModule } from '@angular/router';
import { FormGroupModule } from 'src/app/components/form-group/form-group.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputRestrictionModule } from 'src/app/core/directives/input-restriction.directive';
import { BusyModule } from 'src/app/core/directives/busy.directive';

const routes: Routes = [
  { path: '', component: UserCreateAndUpdateComponent }
];

@NgModule({
  declarations: [
    UserCreateAndUpdateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    FormGroupModule,
    BusyModule,
    InputRestrictionModule,
  ]
})
export class UserCreateAndUpdateModule { }
