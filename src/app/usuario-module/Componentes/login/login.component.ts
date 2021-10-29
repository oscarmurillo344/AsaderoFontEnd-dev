import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { DataMenuService } from 'src/app/principal-module/Servicios/data-menu.service';
import { LocalstorageService } from 'src/app/principal-module/Servicios/localstorage.service';
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
  
  constructor(private route:Router,
            private mensaje:ToastrService, 
            public _data:DataMenuService,
            private local:LocalstorageService,
            private token:TokenServiceService,
            private Servicio_login:AuthService) 
    {
   this.UserForm=this.crearFormulario();
   }

   crearFormulario(){
     return new FormGroup({
      usuario: new FormControl('',Validators.required),
      contrasena: new FormControl('',Validators.required)
     });
   }
  ngOnInit() {    
    if(this.token.TokenExpirado()){
      this.local.RemoveAll()
      this._data.CerrarMenu()
    }
  }

  LogIn(){
    if(this.UserForm.valid){
    var loginusu =new LoginUsuario(this.minuscula(this.UserForm.value.usuario),
                                   this.UserForm.value.contrasena);
    this.Servicio_login.LogIn(loginusu).subscribe(
      (data:jwtDTO) =>{
        this.Validar=false;
        this.token.setToken(data.access_token)
        var Usuario = this.token.ObtenerData()
        this.token.setUser(Usuario.user_name)
        this.token.setAuth(Usuario.authorities)
        this.mensaje.success("sesión iniciada","información");
        this.route.navigate(["ventas/inicio"])
        this._data.AbrirMenu()
    })  
    }else{
      this.mensaje.warning("Formulario invalido", "Advertencia")
    }
  }
  public minuscula(texto:string):string{
   return texto.toLocaleLowerCase();
  }

}
