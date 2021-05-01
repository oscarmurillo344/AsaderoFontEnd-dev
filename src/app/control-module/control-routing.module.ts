import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from '../principal-module/Componentes/error/error.component';
import { ControlventasComponent } from './Componentes/controlventas/controlventas.component';

const routes: Routes = [{ path: '', children:[
  {path: 'ventas', component: ControlventasComponent},
  { path: '404', component: ErrorComponent}, 
  { path: '', redirectTo: '/ventas', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full'}
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlRoutingModule { }
