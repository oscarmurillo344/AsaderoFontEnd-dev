import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenServiceService } from '../../usuario-module/Servicios/token-service.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private token:TokenServiceService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let intreq = req;
    let token =this.token.getToken()
   if(token != null){
     intreq = req.clone({
      setHeaders:{
        'Authorization':"Bearer "+token,
        "Content-Type": "application/json"
      }
     })
   }else{
    const credenciales=btoa('AngularVentasAsadero'+':'+'Andy$_2003_$')
    intreq = req.clone({
     setHeaders:{
      "Content-Type": "application/x-www-form-urlencoded",
      'Authorization':"Basic "+credenciales
     }
    });
   }
   return next.handle(intreq);
  }
}
