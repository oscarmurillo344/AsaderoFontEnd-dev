import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { NuevoUsuario } from "../Modelos/nuevoUsuario";
import { LoginUsuario } from "../Modelos/loginUsuario";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Mensaje } from 'src/app/principal-module/Modelos/mensaje';
import { Usuario } from '../Modelos/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  UsuarioURL=environment.Url+"usuario/";

  constructor(private http:HttpClient) { }

  public nuevoUser(newUser:NuevoUsuario): Observable<any>{
    return this.http.post<any>(this.UsuarioURL+'ingresar',newUser);
  }

  public LogIn(login:LoginUsuario): Observable<any>{
   let params = new URLSearchParams();
   params.set("grant_type","password")
   params.set("username",login.username)
   params.set("password",login.password)
    return this.http.post<any>(environment.Url+'oauth/token',params.toString());
  }

  public ListarUsuario():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.UsuarioURL+'lista');
  }
  
  public EliminarUser(id:number): Observable<Mensaje>{
    return this.http.delete<Mensaje>(this.UsuarioURL+'eliminar/'+id);
  }
}

