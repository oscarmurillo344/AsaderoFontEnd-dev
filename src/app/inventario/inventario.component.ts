import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { LocalStorage } from "../clases/token/local-storage";
import {MatDialog} from '@angular/material/dialog';
import { DialogoYesNoComponent } from '../Dialogo/dialogo-yes-no/dialogo-yes-no.component';
import { DialogoUpdateComponent } from '../Dialogo/dialogo-update/dialogo-update.component';
import { Producto } from '../clases/productos/producto';
import { InventarioService } from "../service/inventario.service";
import { Inventario } from '../clases/productos/inventario';
import { AppComponent } from '../app.component';
import {  Subject, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})

export class InventarioComponent implements OnInit,OnDestroy {
  ProductForm :FormGroup;
  BuscarProductForm: FormGroup;
  ListaInventario:MatTableDataSource<Inventario>;
  ComboInventario:Array<Inventario>;
  local:LocalStorage;
  product:Producto;
  nombreBuscar:string;
  displayedColumns: string[] = ['Nombre', 'Cantidad','Editar', 'Eliminar'];
  lista:string[]=[];
  undescribe:Subscription;
  filtro:string='';
  //datos:any={"values":[[1,"Pollo crudo",5.0,0,"mercaderia"],[2,"1 pollo",11.0,8,"platos"],[3,"1/2 pollo",5.5,4,"platos"],[4,"1/4 pechuga",3.5,2,"platos"],[5,"1/4 pierna",3.0,2,"platos"],[6,"1/8 pierna",1.5,1,"platos"],[7,"1/8 pechuga",1.75,1,"platos"],[8,"Arroz con menestra pierna",2.75,1,"platos"],[11,"Aguado de presa",1.5,1,"platos"],[13,"Cola grande",0.5,0,"bebidas"],[14,"Quaker",0.75,0,"bebidas"],[15,"Agua",0.5,0,"bebidas"],[17,"Jugos grandes",0.75,0,"bebidas"],[18,"Cola 1.5L",1.5,0,"bebidas"],[19,"Cola 1 1/4L",1.25,0,"bebidas"],[21,"Cola 2L",2.0,0,"bebidas"],[16,"Jugos mediano",0.5,0,"bebidas"],[20,"Cola 3L",3.5,0,"bebidas"],[22,"Arroz-1",1.0,0,"porciones"],[23,"Arroz-15",1.5,0,"porciones"],[24,"Menestra-1",1.0,0,"porciones"],[25,"Menestra-15",1.5,0,"porciones"],[26,"Menestra-Tarrina",2.0,0,"porciones"],[27,"Ensalada-05",0.5,0,"porciones"],[28,"Promo pollo",15.0,12,"combos"],[29,"Promo 1/2 pollo",7.5,6,"combos"],[31,"Promo 1/4 pechuga",4.0,3,"combos"],[32,"Combo 1-p",3.0,1,"combos"],[33,"Combo 1-pechu",3.25,1,"combos"],[10,"Aguado de menudencia",1.25,0,"platos"],[9,"Arroz con menestra pechuga",3.0,1,"platos"],[34,"Cola mediana",0.4,0,"bebidas"],[35,"Promo 1/4 pierna",3.75,3,"combos"]],"fields":["id","nombre","precio","presa","tipo"],"types":[23,1043,700,23,1043],"type_names":["integer","text","float","integer","text"],"started_at":"2021-02-12 19:05:16 +0000","finished_at":"2021-02-12 19:05:16 +0000","checksum":"b8323af8a80d9336227ff48a17625a37"}
  private unsuscribir = new Subject<void>();
  
  constructor(
    private mensaje:ToastrService,
    public dialog: MatDialog,
    private __inventarioService:InventarioService
        ) { 
      this.ComboInventario=new Array();
      this.local=new LocalStorage();
      this.cargarCantidad();
      this.__inventarioService.listen().pipe(
        takeUntil(this.unsuscribir)
      ).subscribe((m:any)=>{
      this.cargarCantidad();
      });
    this.ProductForm=this.createForm();
    this.nombreBuscar='';
  }
  ngOnDestroy(): void {
    this.unsuscribir.next();
    this.unsuscribir.complete();
  }

  ngOnInit() {
    //this.crearProductoJSON()
  }
  
  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(this.ListaInventario !== undefined){
      this.ListaInventario.filter = filterValue.trim().toLowerCase();
    }
  }

  cargarCantidad(){
   this.__inventarioService.listarInventartio()
   .pipe( takeUntil(this.unsuscribir))
   .subscribe(
      (data:any)=>{
        this.ListaInventario=new MatTableDataSource(data);
        this.local.SetStorage("listaProducto",data);
        this.CargarCombo();
        AppComponent.OrdenarData(this.ListaInventario.filteredData);
      });
       
  }
  
      CargarCombo(){
          this.ComboInventario=this.local.GetStorage("listaProducto");
          this.ComboInventario.forEach((data,index)=>{
            if(data.productoId.tipo=='combos'){
              this.ComboInventario.splice(index,1);
            }
          });
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
      this.product=new Producto(null,
        this.ProductForm.value.nombre,
        this.ProductForm.value.tipo,
        this.ProductForm.value.precio,
        this.ProductForm.value.presa);
     this.__inventarioService.ingresarInventario(new Inventario(this.product,this.lista.toString(),0,0))
     .pipe( takeUntil(this.unsuscribir))
     .subscribe(d=>{
        this.mensaje.success(d.mensaje,"Exitoso");
      this.ProductForm.reset();
        this.__inventarioService.listarInventartio().
        pipe( takeUntil(this.unsuscribir))
        .subscribe((da:any)=>
          {
            
            this.local.SetStorage("listaProducto",da);
           this.ListaInventario=new MatTableDataSource(da)
          }
           );
      },error=>{
       if(error.error.mensaje!== undefined){
        this.mensaje.error(error.error.mensaje,"Error");
       }else{
        this.mensaje.error("Error en la consulta","Error");
       }
      
      });
      
    }
  }

 /* crearProductoJSON():void{
   console.log(this.datos.values)
  for(let i=0; i < this.datos.values.length; i++){
    this.__inventarioService.ingresarInventario(new Inventario(new Producto(
      0,this.datos.values[i][1],this.datos.values[i][4],this.datos.values[i][2],this.datos.values[i][3]
     ),'',0,0))
       .subscribe(dato=>{
        console.log(dato)
       }) 
   }
  }*/
  public value($event){
    this.lista=[];
  }
  public valueChange($event){
    if($event.checked){
      this.lista.push($event.source.value);
    }else if($event.checked===false){

      this.lista.forEach((data:string,i:number)=>{
        if(data==$event.source.value){
          this.lista.splice(i,1);
        }
      });
    }
  }

  public Editar(index):void{
    this.dialog.open(DialogoUpdateComponent,{data:this.ListaInventario.data[index]});
  }

  public Eliminar(index):void{
    let resultado=this.dialog.open(DialogoYesNoComponent,
      {data:{nombre:this.ListaInventario.filteredData[index].productoId.nombre,titulo:'producto'}});
   resultado.afterClosed().
   pipe( takeUntil(this.unsuscribir))
   .subscribe(result=>{
    if(result=='true'){
        this.__inventarioService.EliminarInventario(this.ListaInventario.filteredData[index].id).
        pipe( takeUntil(this.unsuscribir))
        .subscribe(data =>{
        this.mensaje.success(data.mensaje,"Exitoso");
       this.cargarCantidad();
      },error =>{
        if(error.error.mensaje!==undefined){
          this.mensaje.error(error.error.mensaje,"Error");
        }else{
          this.mensaje.error("Error en la consulta","Error");
        }
      }
      );
    }else{
      resultado.close();
    }
   });
    
  }

}
