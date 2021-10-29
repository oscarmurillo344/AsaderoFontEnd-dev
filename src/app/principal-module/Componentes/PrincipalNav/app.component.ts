import { Component,OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, window } from 'rxjs/operators';
import { Router } from "@angular/router";
import { LocalstorageService } from '../../Servicios/localstorage.service';
import { TokenServiceService } from 'src/app/usuario-module/Servicios/token-service.service';
import { DataMenuService } from '../../Servicios/data-menu.service';
import MenuListBg from '../../Modelos/menu';
import { DataMenu } from '../../Modelos/DataMenu';
import { LoadingService } from '../../Servicios/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  notificacion:number = 0
  DataCarrito:any[] = []
  cerrarNav: boolean = false
  ListaMenu:MenuListBg[] = DataMenu
  VerMenu =  this._data.$toogleMenu
  VerLoading = this.loading.$cargando
  Notificacion = this._data.$notificacion
  isHandset$: Observable<boolean> = this.breakpointObserver.observe([
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge
  ]).pipe(
      map(result => result.matches),
      shareReplay()
    );

constructor(
    private breakpointObserver: BreakpointObserver,
    private router:Router,
    public _data:DataMenuService,
    private local:LocalstorageService,
    public loading: LoadingService,
    private token:TokenServiceService) {
      this.isHandset$.subscribe((data: boolean): boolean => this.cerrarNav = data)
} 


  ngOnInit(){
    if(this.token.TokenExpirado()){
      this.router.navigate(['auth/login']);
      this.local.RemoveAll()
      this._data.CerrarMenu()
    }else{
      this._data.AbrirMenu()
    }
    this.Notificacion.subscribe(()=> this.CargarNotificacion)
  }

 CargarNotificacion(): void{

 }
  logOut(){
      this.local.RemoveAll();
      this._data.CerrarMenu();
      this.router.navigate(['auth/login']);
  }
}
