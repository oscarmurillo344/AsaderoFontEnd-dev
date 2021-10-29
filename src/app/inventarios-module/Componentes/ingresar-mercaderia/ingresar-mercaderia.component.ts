import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataMenuService } from 'src/app/principal-module/Servicios/data-menu.service';
import { LocalstorageService } from 'src/app/principal-module/Servicios/localstorage.service';
import { Inventario } from '../../Modelos/inventario';
import { updatePollo } from '../../Modelos/updatePollo';
import { InventarioService } from '../../Servicios/inventario.service';

@Component({
  selector: 'app-ingresar-mercaderia',
  templateUrl: './ingresar-mercaderia.component.html',
  styleUrls: ['./ingresar-mercaderia.component.css']
})
export class IngresarMercaderiaComponent implements OnInit {

  PollosForm:FormGroup;
  update!:updatePollo;
  update2!:updatePollo;
  productLista:Array<Inventario>=new Array();
  constructor(
    private __serviceinven:InventarioService,
    private toast:ToastrService,
    private _data:DataMenuService,
    private route:Router,
    private local:LocalstorageService
  ) 
  { 
    this.PollosForm=this.crearForm();
  }
  ngOnInit() {
  }
 crearForm(){
   return new FormGroup({
     pollo:new FormControl(0,[Validators.required,Validators.min(0)]),
     presa:new FormControl(0,[Validators.required,Validators.max(8),Validators.min(0)]),
     validar:new FormControl()
   });
 }

 ActualizarPollo(){
   if (this.PollosForm.valid){
     this.update=new updatePollo(this.PollosForm.value.pollo,
      this.PollosForm.value.presa)
      if(!this.PollosForm.value.validar){
        
        this.productLista=this.local.GetStorage("listaProducto");
        var inventario = this.productLista.find((data:Inventario)=> data.producto?.tipo==='mercaderia' )
        this.__serviceinven.UpdatePollo(inventario?.id == undefined? 0:inventario.id,this.update). 
        subscribe(data=>{
          this._data.pollo+=this.PollosForm.value.pollo;
          this._data.presa+=this.PollosForm.value.presa;
          this.update2=new updatePollo(this._data.pollo,this._data.presa);
          this.toast.success(data.mensaje,"Exitoso");
          this.PollosForm.reset();
          this.__serviceinven.TablePollo(this.update2).
                subscribe(data=>this.route.navigate(["ventas/inicio"]),error =>{
                  if(error.error.mensaje===undefined) this.toast.error("Error en la consulta","Error");
                  else this.toast.error(error.error.mensaje,"Error");
                })
        },error=>{
          if(error.error.mensaje===undefined) this.toast.error("Error en la consulta","Error");
          else this.toast.error(error.error.mensaje,"Error");
        })
      }else{
        this.__serviceinven.TablePollo(this.update).
        subscribe(data=> this.route.navigate(["ventas/inicio"]));
        this._data.pollo=this.PollosForm.value.pollo;
        this._data.presa=this.PollosForm.value.presa;
        this.toast.success("Pollo actualizado","Exitoso");
        this.PollosForm.reset();
      }
   }
 }

}
