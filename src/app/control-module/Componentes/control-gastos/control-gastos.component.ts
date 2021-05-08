import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Gastos } from 'src/app/gastos-module/Modelos/gastos';
import { GastosX } from 'src/app/gastos-module/Modelos/gastosX';
import { GastosService } from 'src/app/gastos-module/Servicios/gastos.service';
import { NuevoUsuario } from 'src/app/usuario-module/Modelos/nuevoUsuario';

@Component({
  selector: 'app-control-gastos',
  templateUrl: './control-gastos.component.html',
  styleUrls: ['./control-gastos.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ControlGastosComponent implements OnInit {

  @ViewChild(MatPaginator,{static:false}) paginatorGastos!:MatPaginator;
  @Input()  DataGastos!: MatTableDataSource<Gastos>;
  @Input()  user!:Array<NuevoUsuario>;
  valorGasto:number=0;
  GastosColumns: string[] = ['No', 'tipo', 'valor','eliminar'];
  cerrado:boolean | undefined;
  gastos!:Gastos | null;
  complete:boolean;
  tipoForm:FormGroup;
  gastosx!:GastosX;
  private unsuscribir = new Subject<void>();

  constructor(
    private __gastos:GastosService,
    private toast:ToastrService,
    public dialogo:MatDialog
  ) {
    this.tipoForm=this.crearFormThree();
    this.complete=true
   }

  ngOnInit(): void {
    this.__gastos.listen().
    pipe( takeUntil(this.unsuscribir))
    .subscribe(data=>{
      this.inicializarPaginatorGastos()
      this.getTotalCostosGastos()
    })
  }

  ngOnDestroy(): void {
    this.unsuscribir.next();
    this.unsuscribir.complete();
  }

  crearFormThree():FormGroup{
    return new FormGroup({
      elegir:new FormControl('',Validators.required),
      usuario:new FormControl('',Validators.required),
      start:new FormControl(new Date(),Validators.required),
      end:new FormControl(new Date(),Validators.required)
    });
  }
  inicializarPaginatorGastos():void {
   setTimeout(()=> this.DataGastos.paginator = this.paginatorGastos);
  }

  applyFilter(event: Event):void{
    const filterValue = (event.target as HTMLInputElement).value;
    if(this.DataGastos !== undefined){
      this.DataGastos.filter = filterValue.trim().toLowerCase();
      this.getTotalCostosGastos();
      if (this.DataGastos.paginator) {
        this.DataGastos.paginator.firstPage();
      }
    }
  }

  getTotalCostosGastos():void{
   setTimeout(()=>{
    this.valorGasto=0;
    this.DataGastos.filteredData.forEach(ele => this.valorGasto=this.valorGasto+ele.valor)  
   })
  }

  ListarGastos2():void{
    if (this.tipoForm.valid){
      this.complete=false;
      this.cerrado=false;
      this.gastosx=new GastosX(
        this.tipoForm.value.usuario,
        this.tipoForm.value.elegir,
        this.tipoForm.value.start,
        this.tipoForm.value.end
      );
      if(this.tipoForm.value.elegir !== 'todo' && this.tipoForm.value.usuario !=='todo'){
        this.__gastos.listarTipoUserFecha(this.gastosx).
        pipe( takeUntil(this.unsuscribir)).
        subscribe((data:Gastos[])=>{
          this.DataGastos=new MatTableDataSource(data);
          this.inicializarPaginatorGastos();
          this.getTotalCostosGastos();
          this.complete=true;
          this.cerrado=undefined;
        },error=>this.mensajeError(error))
      }else if(this.tipoForm.value.elegir ==='todo' && this.tipoForm.value.usuario !=='todo'){
        this.__gastos.listarUserFecha(this.gastosx).
        pipe( takeUntil(this.unsuscribir)).
        subscribe((data:Gastos[])=>{
          this.DataGastos=new MatTableDataSource(data);
          this.inicializarPaginatorGastos();
          this.getTotalCostosGastos();
          this.complete=true;
          this.cerrado=undefined;
        },error=>this.mensajeError(error))
      }else if(this.tipoForm.value.elegir==='todo' && this.tipoForm.value.usuario==='todo'){
        this.__gastos.listarFecha(this.gastosx).
        pipe( takeUntil(this.unsuscribir))
        .subscribe((data:Gastos[])=>{
          this.DataGastos=new MatTableDataSource(data);
          this.inicializarPaginatorGastos();
          this.getTotalCostosGastos();
          this.complete=true;
          this.cerrado=undefined; 
        },error=>this.mensajeError(error))
      }else if(this.tipoForm.value.elegir !=='todo' && this.tipoForm.value.usuario==='todo'){
        this.__gastos.ListarTipoFecha(this.gastosx).
        pipe( takeUntil(this.unsuscribir)).
        subscribe((data:Gastos[])=>{
          this.DataGastos=new MatTableDataSource(data);
          this.inicializarPaginatorGastos();
          this.getTotalCostosGastos();
          this.complete=true;
          this.cerrado=undefined;
        },error=>this.mensajeError(error))
      }
     }
  }
  
  Eliminar(i:number):void{
      let nuevo:number,id:number;
    if(this.DataGastos.paginator?.pageIndex !==0)nuevo=Math.abs(this.DataGastos.paginator?.pageSize?+i:0)
    else nuevo=i;
    id=this.DataGastos.filteredData[nuevo].id;
    this.DataGastos.filteredData.splice(nuevo,1);
    this.__gastos.Eliminar(id).
    pipe( takeUntil(this.unsuscribir)).
    subscribe(data=>{
      this.toast.success(data.mensaje,"Exitoso");
      this.inicializarPaginatorGastos();
      this.getTotalCostosGastos();
    },error=>this.mensajeError(error)) 
  }

  mensajeError(error:any){
    if(error.error.mensaje===undefined)this.toast.error("Error en la consulta","Error");
      else this.toast.error(error.error.mensaje,"Error");
  }

}
