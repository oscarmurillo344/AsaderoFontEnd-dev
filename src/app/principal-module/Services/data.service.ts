import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  nombreUsuario:string='default';
  pollo:number=0;
  presa:number=0;
  itemNav:boolean=false
  botonesNav:boolean=true
  notification = new EventEmitter<number>();
  constructor() { 
  }
    CambiarItem(valor:boolean){
    this.itemNav=valor 
    }
    ObtenerItem():boolean{
      return this.itemNav
    }
    CambiarBoton(valor:boolean){
      this.botonesNav=valor 
    }
    ObtenerBoton():boolean{
      return this.botonesNav
    }
}
