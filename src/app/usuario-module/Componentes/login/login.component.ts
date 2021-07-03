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
  hide=true;
  roles:string[]=[];
  verProgress:boolean;
  
  constructor(private route:Router,private mensaje:ToastrService, 
            private token:TokenServiceService,private Servicio_login:AuthService,
            public __Data:DataService) 
    {
   this.UserForm=this.crearFormulario();
   this.verProgress=true;
   }

   crearFormulario(){
     return new FormGroup({
      usuario: new FormControl('',Validators.required),
      contrasena: new FormControl('',Validators.required)
     });
   }
  ngOnInit() {    
  }

  LogIn(){
    if(this.UserForm.valid){
      this.verProgress=false;
    var loginusu =new LoginUsuario(this.minuscula(this.UserForm.value.usuario),this.UserForm.value.contrasena);
    this.Servicio_login.LogIn(loginusu).subscribe(
      (data:jwtDTO) =>{
        this.Validar=false;
        this.token.setToken(data.access_token)
        var Usuario = this.token.ObtenerData()
        this.token.setUser(Usuario.user_name)
        this.token.setAuth(Usuario.authorities)
        this.mensaje.success("sesión iniciada","información");
        this.verProgress=true;
        this.route.navigate(["ventas/inicio"])
        this.__Data.CambiarBotonMenu(false)
        this.__Data.CambiarBotonCarrito(false)
    },
    (err:any) =>{
      this.Validar=true;
      this.verProgress=true;
      console.log(err)
    })  
    }
  }
  public minuscula(texto:string):string{
   return texto.toLocaleLowerCase();
  }

}
