import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlRoutingModule } from './control-routing.module';
import { ControlventasComponent } from './Componentes/controlventas/controlventas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModuleModule } from '../material-module/material-module.module';
import { ExportarComponent } from './Componentes/exportar/exportar.componentes';


@NgModule({
  declarations: [ControlventasComponent,ExportarComponent],
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
