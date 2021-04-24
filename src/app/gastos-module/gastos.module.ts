import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GastosRoutingModule } from './gastos-routing.module';
import { GastosComponent } from './Componentes/CrearGasto/gastos.component';
import { GastosService } from './Servicios/gastos.service';
import { MaterialModuleModule } from '../material-module/material-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [GastosComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GastosRoutingModule,
    MaterialModuleModule
  ],
  providers: [
    GastosService
  ],
  exports: [
    GastosComponent
  ]
})
export class GastosModule { }
