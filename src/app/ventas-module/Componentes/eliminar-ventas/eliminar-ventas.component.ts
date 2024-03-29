import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Mensaje } from 'src/app/principal-module/Modelos/mensaje';
import { Factura } from '../../Modelos/factura';
import { PagarService } from '../../Servicios/pagar.service';

@Component({
  selector: 'app-eliminar-ventas',
  templateUrl: './eliminar-ventas.component.html'
})
export class EliminarVentasComponent implements OnInit {

  ListaFactura:Array<Factura>;
  displayedColumns=['Nombre','Cantidad','Fecha','Hora'];
  numeroFact:number=0;
  bloqueo:boolean=true;

  constructor(
    private __servicioPago:PagarService,
    private toast:ToastrService,
    private route:Router
  ) { 
    this.ListaFactura=new Array()
  }

  ngOnInit() {
  }

  buscar():void{
    if(this.numeroFact!==0){
      this.__servicioPago.listar(this.numeroFact)
      .subscribe(
        (data:any)=>{
       if(data.mensaje===undefined){
            this.ListaFactura=data;
            this.bloqueo=false;
            this.toast.success("factura encontrada","Exitoso");
          }else{
            this.toast.error("factura no encontrada","Exitoso");
          }

        },error=>{
          if(error.error.mensaje===undefined){
            this.toast.error("factura no encontrada","Error");
            console.log(error)
          }else{
            this.toast.error(error.error.mensaje,"Error");
          }
        });
    }else{
      this.toast.info("numero no valido","Error");
    }
  }
  Eliminar():void{
    if(this.numeroFact!==0){
      this.__servicioPago.eliminar(this.numeroFact)
      .subscribe((data:Mensaje)=>{
        this.toast.success(data.mensaje,"Exitoso");
        this.bloqueo=false;
        this.route.navigate(["ventas/inicio"]);
      },error=>{
        if(error.error.mensaje===undefined){
          this.toast.error("no eliminado","Error");
        }else{
          this.toast.error(error.error.mensaje,"Error");
        }
        this.bloqueo=false;
      });
    }else{
      this.toast.info("numero no valido","Error");
    }
  }

}
