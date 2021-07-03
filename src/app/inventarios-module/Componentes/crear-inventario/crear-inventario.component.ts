import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/principal-module/Componentes/PrincipalNav/app.component';
import { Inventario } from 'src/app/inventarios-module/Modelos/inventario';
import { InventarioService } from 'src/app/inventarios-module/Servicios/inventario.service';
import { LocalstorageService } from 'src/app/principal-module/Servicios/localstorage.service';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Mensaje } from 'src/app/principal-module/Modelos/mensaje';
import { Producto } from '../../Modelos/producto';
import { ProductoListService } from '../../Servicios/producto-list.service';

@Component({
  selector: 'app-crear-inventario',
  templateUrl: './crear-inventario.component.html',
  styleUrls: ['./crear-inventario.component.css']
})
export class CrearInventarioComponent implements OnInit {

  ProductForm :FormGroup;
  ComboInventario:Array<Inventario>=new Array();
  product!:Producto;
  lista:string[]=[];
  private unsuscribir = new Subject<void>();
  
  constructor(
    private mensaje:ToastrService,
    private __inventarioService:InventarioService,
    private __productoService:ProductoListService,
    private local:LocalstorageService
    ) { 
      this.ProductForm=this.createForm();
  }
  
  ngOnDestroy(): void {
    this.unsuscribir.next();
    this.unsuscribir.complete();
  }

  ngOnInit() {
    this.__inventarioService.EventoCargarInventario.pipe(takeUntil(this.unsuscribir)).
    subscribe(evento=>evento=="combo"?this.CargarCombo():null);
  }
  

  CargarCombo(){
      this.ComboInventario=this.local.GetStorage("listaProducto");
      this.ComboInventario.forEach((data,index)=> data.producto?.tipo=='combos' ? this.ComboInventario.splice(index,1):undefined)
      AppComponent.OrdenarData(this.ComboInventario);
  }
  createForm(){
    return new FormGroup({
      nombre: new FormControl('',Validators.required),
      tipo: new FormControl('',Validators.required),
      precio: new FormControl('',Validators.required),
      presa: new FormControl('',[Validators.required,Validators.pattern('^[0-9]+')])
    });
  }

  CrearProduct(){
    if(this.ProductForm.valid){
      this.product=new Producto(0,
        this.ProductForm.value.nombre,
        this.ProductForm.value.tipo,
        this.ProductForm.value.precio,
        this.ProductForm.value.presa);
        
    this.__productoService.nuevoProducto(this.product)
     .subscribe((data:Mensaje)=>{
      var inventario = new Inventario(data.cuerpo as Producto,this.lista.toString(),0,0)
        this.__inventarioService.ingresarInventario(inventario).subscribe((data:Mensaje)=>{
        this.mensaje.success(data.mensaje,"Exitoso")
        this.ProductForm.reset();
        this.__inventarioService.EventoCargarInventario.emit("CargarInventario")
      });
      },error=>this.MensajeError(error))
    }
  }
  public valueChange($event:any){
    if($event.checked){
      this.lista.push($event.source.value);
    }else if($event.checked===false){
      this.lista.forEach((data:string,i:number)=> data==$event.source.value ? this.lista.splice(i,1):undefined)
    }
  }

  
  MensajeError(error:any){
    if(error.error.mensaje!== undefined) this.mensaje.error(error.error.mensaje,"Error")
     else this.mensaje.error("Error en la consulta","Error");
  }
}
