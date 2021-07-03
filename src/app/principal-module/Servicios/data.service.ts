import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  nombreUsuario:string='default';
  pollo:number=0;
  presa:number=0;
  VerBotonMenu :boolean=true
  VerBotonCarrito :boolean=true
  VerItemsMenu:boolean=true
  VerNavegador:boolean=true
  notification = new EventEmitter<number>();
  constructor() { 
  }
    CambiarBotonMenu(valor:boolean){
      this.VerBotonMenu=valor
    }
    ObtenerBotonMenu(){
     return this.VerBotonMenu 
    }
    CambiarItemsMenu(valor:boolean){
    this.VerItemsMenu=valor 
    }
    ObtenerItemsMenu():boolean{
      return this.VerItemsMenu
    }

    ObtenerBotonCarrito():boolean{
      return this.VerBotonCarrito
    }
    CambiarBotonCarrito(valor:boolean){
      this.VerBotonCarrito=valor 
      }

    ObtenerVerNavegador():boolean{
      return this.VerNavegador
    }
    CambiarVerNavegador(valor:boolean){
      this.VerNavegador=valor 
      }
}
