import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TokenServiceService } from 'src/app/usuario-module/Services/token-service.service';
import { Gastos } from '../../Entidades/gastos';
import { GastosX } from '../../Entidades/gastosX';
import { GastosService } from '../../Servicios/gastos.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent implements OnInit,OnDestroy {

  GastoForm:FormGroup;
  gasto!:Gastos;
  valorGasto:number=0
  gastox!: GastosX;
  private unsuscribir = new Subject<void>();

  constructor(private __GastosService:GastosService,
    private toast:ToastrService,
    private token:TokenServiceService)
     { 
    this.GastoForm=this.crearForm();
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.unsuscribir.next();
    this.unsuscribir.complete();
  }
  
  crearForm(){
    return new FormGroup({
      tipo:new FormControl('',Validators.required),
      valor:new FormControl('',Validators.required),
      descrip:new FormControl('',Validators.required)
    });
  }

 

  IngresarGasto(){
    if(this.GastoForm.valid){
      this.gasto=new Gastos(this.GastoForm.value.tipo,
        this.GastoForm.value.valor,this.token.getUser(),
        this.GastoForm.value.descrip);
      this.__GastosService.Ingresar(this.gasto).
      pipe( takeUntil(this.unsuscribir))
      .subscribe(data=>{
        this.toast.success(data.mensaje,"Exito");
        this.GastoForm.reset();
      },error=>{
        if(error.error.mensaje!=undefined){
          this.toast.error(error.error.mensaje,"Error");
        }else{
          this.toast.error("Error en la consulta","Error");
        }
      }
      );
    }
  }

}
