import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NuevoUsuario } from "../Modelos/nuevoUsuario";
import { LoginUsuario } from "../Modelos/loginUsuario";
import { Observable } from 'rxjs';
import { jwtDTO } from '../Modelos/jwt-to';
import { environment } from 'src/environments/environment.prod';
import { Mensaje } from 'src/app/principal-module/Modelos/mensaje';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  authURL=environment.Url+"auth/";

  constructor(private http:HttpClient) { }

  public nuevoUser(newUser:NuevoUsuario): Observable<any>{
    return this.http.post<any>(this.authURL+'nuevo',newUser);
  }

  public LogIn(login:LoginUsuario): Observable<jwtDTO>{
    return this.http.post<jwtDTO>(this.authURL+'login',login);
  }

  public ListarUsuario():Observable<NuevoUsuario[]>{
    return this.http.get<NuevoUsuario[]>(this.authURL+'listaUsu');
  }
  
  public EliminarUser(id:number): Observable<Mensaje>{
    return this.http.delete<Mensaje>(this.authURL+'deleteuser/'+id);
  }
}

