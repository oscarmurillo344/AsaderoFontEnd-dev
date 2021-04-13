import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { MaterialModuleModule } from '../material-module/material-module.module';


import { InventarioService } from './Services/inventario.service';
import { PagarService } from './Services/pagar.service';
import { ProductoListService } from './Services/producto-list.service';

import { PrincipalVentasComponent } from './Componentes/principal-ventas/principal-ventas.component';
import { FacturarVentasComponent } from './Componentes/facturar-ventas/facturar-ventas.component';



@NgModule({
  declarations: [PrincipalVentasComponent, FacturarVentasComponent],
  imports: [
    CommonModule,
    MaterialModuleModule,
    VentasRoutingModule
  ],
  exports:[
    PrincipalVentasComponent
  ],
  providers:[
    InventarioService,
    PagarService,
    ProductoListService
  ]
})
export class VentasModule { }
