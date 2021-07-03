import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mensaje } from '../../principal-module/Modelos/mensaje';
import { environment } from 'src/environments/environment.prod';
import { Producto } from '../Modelos/producto';


@Injectable({
  providedIn: 'root'
})
export class ProductoListService {

  ProductURL=environment.Url+"producto/";

  constructor(private http:HttpClient) { }

  public nuevoProducto(newProduct:Producto): Observable<Mensaje>{
    return this.http.post<Mensaje>(this.ProductURL+'ingresar',newProduct);
  }

  public ListaProducto(): Observable<Producto>{
    return this.http.get<Producto>(this.ProductURL+'lista');
  }

  public EliminarProducto(id:number): Observable<Mensaje>{
    return this.http.delete<Mensaje>(this.ProductURL+'eliminar/'+id);
  }

  public ActualizarProducto(id:number,producto:Producto): Observable<Mensaje>{
    return this.http.put<Mensaje>(this.ProductURL+'actualizar/'+id,producto);
  }
}
