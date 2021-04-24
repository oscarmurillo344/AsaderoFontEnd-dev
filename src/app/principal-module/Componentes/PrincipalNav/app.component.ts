import { Component,OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, window } from 'rxjs/operators';
import { Router } from "@angular/router";
import { LocalstorageService } from '../../Services/localstorage.service';
import { DataService } from '../../Services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  valor :boolean=true;
  notificacion:number=0;
  Lista:any[]=[];
  vista:boolean=true;
  
isHandset$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 800px)')
.pipe(
map(result => result.matches),
shareReplay()
);

constructor(private breakpointObserver: BreakpointObserver,
    private router:Router,
    public __Data:DataService,
    private local:LocalstorageService) {
} 


    ngOnInit(){
      if(this.local.GetStorage("AuthToken"))
      {
      this.__Data.ObtenerItem()
      this.router.navigate(["ventas/inicio"]);
      }else{
        this.router.navigate(["auth/login"]);
      }
      this.__Data.notification.subscribe((numero:any)=>this.verificarNotificacion())
      this.isHandset$.subscribe(data=> {
        if(this.router.url == "/auth/login")
          this.__Data.CambiarOpen(true)
        else
        this.__Data.CambiarOpen(data)
      });
    }
  
  verificarNotificacion(){
      this.notificacion=0;
      if(this.local.GetStorage('DataCarrito')){
      this.Lista=this.local.GetStorage('DataCarrito');
      this.Lista.forEach(element => this.notificacion+=element.cantidad)
      }
  }

  logOut(){
      this.local.RemoveAll();
      this.router.navigate(['auth/login']);
      this.__Data.CambiarBoton(true)
  }

  public static OrdenarData(dato:Array<any>):void{
    dato.sort(function (o1,o2) {
      if (o1.productoId.nombre > o2.productoId.nombre) { //comparación lexicogŕafica
        return 1;
      } else if (o1.productoId.nombre < o2.productoId.nombre) {
        return -1;
      } 
      return 0;
    });
  }
  public static OrdenarData2(dato:Array<any>):void{
    dato.sort(function (o1,o2) {
      if (o1.nombre > o2.nombre) { //comparación lexicogŕafica
        return 1;
      } else if (o1.nombre < o2.nombre) {
        return -1;
      } 
      return 0;
    });
 }
}
