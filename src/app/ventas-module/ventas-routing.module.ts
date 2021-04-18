import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from '../principal-module/Componentes/error/error.component';
import { EliminarVentasComponent } from './Componentes/eliminar-ventas/eliminar-ventas.component';
import { FacturarVentasComponent } from './Componentes/facturar-ventas/facturar-ventas.component';
import { PrincipalVentasComponent } from './Componentes/principal-ventas/principal-ventas.component';

const routes: Routes = [
  { path:'',
    children:[
      { path: 'inicio', component: PrincipalVentasComponent },
      { path: 'carrito', component: FacturarVentasComponent },
      { path: 'eliminar', component: EliminarVentasComponent },
      { path: '404', component: ErrorComponent}, 
      { path: '', redirectTo: '/inicio', pathMatch: 'full' },
      { path: '**', redirectTo: '/404', pathMatch: 'full'}
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule { }
