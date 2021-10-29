import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataMenuService {

  $toogleMenu = new EventEmitter<boolean>();
  $notificacion = new EventEmitter<number>();
  $nombreUsuario = new EventEmitter<string>();
  verMenu:boolean = false
  pollo:number = 0
  presa:number = 0
  constructor() {
  }

  ToogleMenu(): void{
    this.verMenu=!this.verMenu
    this.$toogleMenu.next(this.verMenu)
  }
  
  AbrirMenu(): void{
    this.verMenu = true
    this.$toogleMenu.next(this.verMenu)
  }

  CerrarMenu(): void{
    this.verMenu = false
    this.$toogleMenu.next(this.verMenu)
  }

  IsMenuState(): boolean{
    return this.verMenu
  }
}
