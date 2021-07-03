import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { LocalstorageService } from '../Servicios/localstorage.service';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../Servicios/data.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorResponse implements HttpInterceptor {

  constructor(private route:Router,
              private local:LocalstorageService,
              private mensaje:ToastrService,
              public __Data:DataService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
   return next.handle(req).pipe(
       catchError((e:any) =>{
            if(e.status == 401){
                this.local.RemoveAll();
                this.route.navigate(["/login"])
                this.__Data.CambiarBotonMenu(true)
                this.__Data.CambiarBotonCarrito(true)
            }
            if(e.status == 403){
                this.mensaje.info("Acceso no permitido","Autorización");
                this.route.navigate(["/inicio"])
            }
            return throwError(e)
       })
   );
  }
}
