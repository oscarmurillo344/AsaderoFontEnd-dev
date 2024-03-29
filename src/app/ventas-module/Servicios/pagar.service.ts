import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Factura } from '../Modelos/factura';
import { Mensaje } from '../../principal-module/Modelos/mensaje';
import { Observable } from 'rxjs';
import { VentasDay } from '../../control-module/Modelos/VentasDay';
import { EntreFecha } from '../../control-module/Modelos/EntreFecha';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class PagarService {

  pagarURL=environment.Url+"factura/";
  
  constructor(private http:HttpClient) { }

  public pagar(newProduct:Factura): Observable<Mensaje>{
    return this.http.post<Mensaje>(this.pagarURL+'facturar',newProduct);
  }

  public listar(numero:number): Observable<Factura>{
    return this.http.get<Factura>(this.pagarURL+'lista/'+numero);
  }

  public eliminar(numero:number): Observable<Mensaje>{
    return this.http.delete<Mensaje>(this.pagarURL+'delete/'+numero)
  }

  public maximoValor(): Observable<number>{
    return this.http.get<number>(this.pagarURL+'numero');
  }

  public TotalDay(usuario:string):Observable<VentasDay[]>{
    return this.http.get<VentasDay[]>(this.pagarURL+'totalDay/'+usuario);
  }

  public TotalFechasUser(Fecha:EntreFecha):Observable<VentasDay[]>{
    return this.http.post<VentasDay[]>(this.pagarURL+'totalfechaUser',Fecha);
  }

  public TotalFechas(Fecha:EntreFecha):Observable<VentasDay[]>{
    return this.http.post<VentasDay[]>(this.pagarURL+'totalfecha',Fecha);
  }

  public TotalUserFechaDia(Fecha:EntreFecha):Observable<VentasDay[]>{
    return this.http.post<VentasDay[]>(this.pagarURL+'totalfechauserdia',Fecha)
  }

  public TotalFechaDia(Fecha:EntreFecha):Observable<VentasDay[]>{
    return this.http.post<VentasDay[]>(this.pagarURL+'totalfechadia',Fecha)
    }

  public TotalFechasComp(Fecha:EntreFecha):Observable<VentasDay[]>{
    return this.http.post<VentasDay[]>(this.pagarURL+'totalfechasComp',Fecha)
    }
}

