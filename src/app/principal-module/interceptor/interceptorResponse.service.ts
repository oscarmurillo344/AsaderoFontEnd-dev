import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { LocalstorageService } from '../Servicios/localstorage.service';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../Servicios/loading.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorResponse implements HttpInterceptor {

  constructor(private route:Router,
              private local:LocalstorageService,
              private mensaje:ToastrService,
              private loading:LoadingService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   this.loading.AbrirCargando()
   return next.handle(req).pipe(
       catchError((e:any) =>{
            if(e.status == 401){
                this.local.RemoveAll();
                this.route.navigate(["auth/login"])
            }
            if(e.status == 403){
                this.mensaje.warning("Acceso no permitido","Autorización");
                this.route.navigate(["ventas/inicio"])
            }
            if(e.error?.mensaje)
            this.mensaje.error(e.error.mensaje,"Error")
            else 
            this.mensaje.error("Error en la consulta","Error")
            return throwError(e)
       }),
       finalize(()=> this.loading.CerrarCargando())
   );
  }
}
