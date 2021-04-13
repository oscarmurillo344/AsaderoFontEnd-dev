import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{path: 'auth', loadChildren: () => import('../usuario-module/usuario.module').then(m => m.UsuarioModule)},
{path: 'ventas', loadChildren: () => import('../ventas-module/ventas.module').then(m => m.VentasModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
