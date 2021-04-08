import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetUpMesComponent } from './set-up-mes.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', component: SetUpMesComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', loadChildren: () => import('./set-up-mes-list/set-up-mes-list.module').then(m => m.SetUpMesListModule) }
    ]
  }
];

@NgModule({
  declarations: [
    SetUpMesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class SetUpMesModule { }
