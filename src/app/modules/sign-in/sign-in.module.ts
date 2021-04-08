import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormGroupModule } from '../../components/form-group/form-group.module';


const routes: Routes = [
  { path: '', component: SignInComponent }
];

@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormGroupModule,
    HttpClientModule,
  ]
})
export class SignInModule { }
