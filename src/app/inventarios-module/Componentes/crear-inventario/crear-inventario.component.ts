import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/principal-module/Componentes/PrincipalNav/app.component';
import { Inventario } from 'src/app/inventarios-module/Entidades/inventario';
import { InventarioService } from 'src/app/inventarios-module/Servicios/inventario.service';
import { LocalstorageService } from 'src/app/principal-module/Services/localstorage.service';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Mensaje } from 'src/app/principal-module/Entidades/mensaje';
import { DialogoUpdateComponent } from '../dialogo-update/dialogo-update.component';
import { DialogoYesNoComponent } from 'src/app/usuario-module/Componentes/dialogo-yes-no/dialogo-yes-no.component';
import { Producto } from '../../Entidades/producto';

@Component({
  selector: 'app-crear-inventario',
  templateUrl: './crear-inventario.component.html',
  styleUrls: ['./crear-inventario.component.css']
})
export class CrearInventarioComponent implements OnInit {

  ProductForm :FormGroup;
  ListaInventario!:MatTableDataSource<Inventario>;
  ComboInventario:Array<Inventario>=new Array();
  product!:Producto;
  displayedColumns: string[] = ['Nombre', 'Cantidad','Editar', 'Eliminar'];
  lista:string[]=[];
  private unsuscribir = new Subject<void>();
  
  constructor(
    private mensaje:ToastrService,
    public dialog: MatDialog,
    private __inventarioService:InventarioService,
    private local:LocalstorageService
    ) { 
      this.ProductForm=this.createForm();
      this.cargarCantidad();
  }
  ngOnDestroy(): void {
    this.unsuscribir.next();
    this.unsuscribir.complete();
  }

  ngOnInit() {
    this.__inventarioService.listen().pipe(takeUntil(this.unsuscribir)
    ).subscribe((m:any)=>this.cargarCantidad())
  }
  
  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(this.ListaInventario !== undefined)this.ListaInventario.filter = filterValue.trim().toLowerCase();
  }

  cargarCantidad(){
   this.__inventarioService.listarInventartio()
   .subscribe((data:Inventario[])=>{
        this.ListaInventario=new MatTableDataSource(data);
        this.local.SetStorage("listaProducto",data);
        this.CargarCombo();
        AppComponent.OrdenarData(this.ListaInventario.filteredData);
      },error=> this.MensajeError(error));
  }
  
  CargarCombo(){
      this.ComboInventario=this.local.GetStorage("listaProducto");
      this.ComboInventario.forEach((data,index)=> data.productoId?.tipo=='combos' ? this.ComboInventario.splice(index,1):undefined)
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
    forkJoin(this.__inventarioService.ingresarInventario(new Inventario(this.product,this.lista.toString(),0,0)),
    this.__inventarioService.listarInventartio())
     .subscribe((data:[Mensaje,Inventario[]])=>{
      this.mensaje.success(data[0].mensaje,"Exitoso")
      this.ProductForm.reset();
      AppComponent.OrdenarData(data[1])
      this.local.SetStorage("listaProducto",data[1])
      this.ListaInventario=new MatTableDataSource(data[1])
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

  public Editar(index:number):void{
    this.dialog.open(DialogoUpdateComponent,{data:this.ListaInventario.data[index]});
  }

  public Eliminar(index:number):void{
    let resultado=this.dialog.open(DialogoYesNoComponent,
      {data:{nombre:this.ListaInventario.filteredData[index].productoId?.nombre,titulo:'producto'}});
   resultado.afterClosed().
   pipe( takeUntil(this.unsuscribir))
   .subscribe(result=>{
    if(result=='true'){
      var idProducto=this.ListaInventario.filteredData[index].id || 0;
        this.__inventarioService.EliminarInventario(idProducto).
        pipe( takeUntil(this.unsuscribir))
        .subscribe(data =>{
        this.mensaje.success(data.mensaje,"Exitoso");
       this.cargarCantidad();
      },error => this.MensajeError(error))
    }else{
      resultado.close();
    }
   });
    
  }
  MensajeError(error:any){
    if(error.error.mensaje!== undefined) this.mensaje.error(error.error.mensaje,"Error")
     else this.mensaje.error("Error en la consulta","Error");
  }
}
