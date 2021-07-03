import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MaterialModuleModule } from '../material-module/material-module.module';
import { UsuarioModule } from '../usuario-module/usuario.module';
import { VentasModule } from '../ventas-module/ventas.module';

import { AppComponent } from './Componentes/PrincipalNav/app.component';
import { ErrorComponent } from './Componentes/error/error.component';

import { InterceptorService } from './interceptor/interceptor.service';
import { DataService } from './Servicios/data.service';
import { LocalstorageService } from './Servicios/localstorage.service';

import localeEs from '@angular/common/locales/es';
import {registerLocaleData  } from "@angular/common";
import { ToastrModule } from 'ngx-toastr';
import { InventariosModule } from '../inventarios-module/inventarios.module';
import { ControlModule } from '../control-module/control.module';
import { InterceptorResponse } from './interceptor/interceptorResponse.service';

registerLocaleData(localeEs,"es")

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModuleModule,
    UsuarioModule,
    VentasModule,
    InventariosModule,
    ControlModule,
    ToastrModule.forRoot({
      timeOut:2000,
      positionClass:'toast-top-center',
      preventDuplicates:false
    })
  ],
  exports: [
    ErrorComponent
  ],
  providers: [
    DataService,
    LocalstorageService,
    {
      provide: LOCALE_ID, useValue: 'es'
    },
    {
      provide: HTTP_INTERCEPTORS,
     useClass: InterceptorService,
        multi: true
     },
     {
      provide: HTTP_INTERCEPTORS,
     useClass: InterceptorResponse,
        multi: true
     }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
