import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NuevoUsuario } from "../Entidades/nuevoUsuario";
import { LoginUsuario } from "../Entidades/loginUsuario";
import { Observable } from 'rxjs';
import { jwtDTO } from '../Entidades/jwt-to';
import { environment } from 'src/environments/environment.prod';

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
}

