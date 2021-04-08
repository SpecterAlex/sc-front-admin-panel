import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  { path: 'app', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: 'sign-in', loadChildren: () => import('./modules/sign-in/sign-in.module').then(m => m.SignInModule) },
  { path: '**', redirectTo: 'app', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', relativeLinkResolution: 'corrected' })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
