import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlRoutingModule } from './control-routing.module';
import { ControlventasComponent } from './Componentes/control-ventas/controlventas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModuleModule } from '../material-module/material-module.module';
import { ExportarComponent } from './Componentes/exportar/exportar.componentes';
import { ControlGastosComponent } from './Componentes/control-gastos/control-gastos.component';


@NgModule({
  declarations: [ControlventasComponent,ExportarComponent, ControlGastosComponent],
  imports: [
    CommonModule,
    ControlRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModuleModule
  ],
  exports:[
    ControlventasComponent,
    ExportarComponent
  ]
})
export class ControlModule { }
