import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Mensaje } from 'src/app/principal-module/Entidades/mensaje';
import { NuevoUsuario } from '../../Entidades/nuevoUsuario';
import { AuthService } from '../../Services/auth.service';
import { DialogoYesNoComponent } from '../dialogo-yes-no/dialogo-yes-no.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit {

  UsuarioForm:FormGroup;
  ListaUsuario!:Array<NuevoUsuario>;
  displayedColumns=['nombre','usuario','roles','Eliminar'];
  User!:NuevoUsuario;
  hide:boolean=true;
  private unsuscribir = new Subject<void>();

  constructor(private __serviceUser:AuthService,
              private toast:ToastrService,
              public dialog: MatDialog) { 
    this.UsuarioForm=this.crearForm();
    this.listarUser();
  }

  ngOnInit() {
    this.listarUser();
  }
  ngOnDestroy(): void {
    this.unsuscribir.next();
    this.unsuscribir.complete();
  }

  crearForm(){
    return new FormGroup({
      nombre: new FormControl('',Validators.required),
      usuario: new FormControl('',Validators.required),
      email: new FormControl('',[Validators.email,Validators.required]),
      pass: new FormControl('',[Validators.required]),
      tipo:new FormControl('',Validators.required)
    });
  }

  listarUser(){
    this.__serviceUser.ListarUsuario().
    subscribe((data:NuevoUsuario[])=> this.ListaUsuario=data);
  }

  CrearUser(){
    if(this.UsuarioForm.valid){
      if(this.UsuarioForm.value.tipo==='user'){
        this.User=new NuevoUsuario(
          this.minuscula(this.UsuarioForm.value.nombre),
          this.minuscula(this.UsuarioForm.value.usuario),
          this.minuscula(this.UsuarioForm.value.email),
          this.UsuarioForm.value.pass,
          ['user']
        );
      }else{
        this.User=new NuevoUsuario(
          this.minuscula(this.UsuarioForm.value.nombre),
          this.minuscula(this.UsuarioForm.value.usuario),
          this.minuscula(this.UsuarioForm.value.email),
          this.UsuarioForm.value.pass,
          ['user',this.UsuarioForm.value.tipo]
        );
      }
      this.__serviceUser.nuevoUser(this.User)
      .subscribe((data:Mensaje)=>{
        if(data.mensaje!==undefined){
          this.toast.success(data.mensaje,"Exitoso");
        }else{
          this.toast.success("consulta realizada","Exitoso");
        }
        this.listarUser();
        this.UsuarioForm.reset();
      },(error:any)=>{
        if(error.error.mensaje!==undefined){
          this.toast.error(error.error.mensaje,"Error");
        }else{
          this.toast.error("Error en la consulta","Error");
        }
      });
    }
  }
  public minuscula(texto:string):string{
    return texto.toLocaleLowerCase();
   }

  Eliminar(i:number):void{

    let resultado=this.dialog.open(DialogoYesNoComponent,
      {data:{nombre:this.ListaUsuario[i].nombre,titulo:'usuario'}});
        resultado.afterClosed().pipe(takeUntil(this.unsuscribir))
        .subscribe(data=>{
          if(data==='true'){
            var idUsuario:number =this.ListaUsuario[i].id || 0;
            this.__serviceUser.EliminarUser(idUsuario).
            subscribe((data:Mensaje)=>{
              this.toast.success(data.mensaje,"Exitoso");
              this.listarUser();
            },(error:any)=>{
                if(error.error.mensaje=== undefined){
                  this.toast.error("Error en consulta","Error");
                }else{
                  this.toast.error(data.mensaje,"Error");
                }
            });
          }else{
            resultado.close();
          }
        });
  }
}
