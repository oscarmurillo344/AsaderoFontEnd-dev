import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { DataService } from 'src/app/principal-module/Servicios/data.service';
import { jwtDTO } from '../../Modelos/jwt-to';
import { LoginUsuario } from '../../Modelos/loginUsuario';
import { AuthService } from '../../Servicios/auth.service';
import { TokenServiceService } from '../../Servicios/token-service.service';

@Component({
  selector: 'vista-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  UserForm: FormGroup;
  Validar: boolean=false;
  hide = true;
  roles:string[]=[];
  completar:boolean;
  
  constructor(private route:Router,private mensaje:ToastrService, 
            private token:TokenServiceService,private Servicio_login:AuthService,
            public __Data:DataService) 
    {
   this.__Data.CambiarOpen(true)
   this.UserForm=this.crearFormulario();
   this.completar=true;
   }

   crearFormulario(){
     return new FormGroup({
      usuario: new FormControl('',Validators.required),
      contrasena: new FormControl('',Validators.required)
     });
   }
  ngOnInit() {
    if(this.token.getToken())this.route.navigate(["ventas/inicio"])
    
  }

  LogIn(){
    if(this.UserForm.valid){
      this.completar=false;
    var loginusu =new LoginUsuario(this.minuscula(this.UserForm.value.usuario),this.UserForm.value.contrasena);
    this.Servicio_login.LogIn(loginusu).subscribe(
      (data:jwtDTO) =>{
        this.Validar=false;
        this.token.setToken(data.token);
        this.token.setUser(data.nombreUsuario);
        this.token.setAuth(data.authorities);
        this.roles=data.authorities;
        this.mensaje.success("sesión iniciada","información");
        this.completar=true;
        this.__Data.CambiarOpen(true)
        this.route.navigate(["ventas/inicio"])
    },
    (err:any) =>{
      this.Validar=true;
      this.completar=true;
      this.mensaje.error(err.error.message,"Error");
    })  
    }
  }
  public minuscula(texto:string):string{
   return texto.toLocaleLowerCase();
  }

}
