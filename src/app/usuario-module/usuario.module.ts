import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './Componentes/CrearUsuario/usuario.component';
import { LoginComponent } from './Componentes/login/login.component';
import { MaterialModuleModule } from '../material-module/material-module.module';
import { ToastrModule } from 'ngx-toastr';




@NgModule({
  declarations: [UsuarioComponent, LoginComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    MaterialModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut:2000,
      positionClass:'toast-top-center',
      preventDuplicates:false
    }),
  ],
  exports: [
    LoginComponent
  ]
})
export class UsuarioModule { }
