import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{path: 'auth', loadChildren: () => import('../usuario-module/usuario.module').then(m => m.UsuarioModule)},
{path: 'ventas', loadChildren: () => import('../ventas-module/ventas.module').then(m => m.VentasModule) },
{ path: 'inventarios', loadChildren: () => import('../inventarios-module/inventarios.module').then(m => m.InventariosModule) },
{ path: 'gastos', loadChildren: () => import('../gastos-module/gastos.module').then(m => m.GastosModule) },
{ path: 'control', loadChildren: () => import('../control-module/control.module').then(m => m.ControlModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
