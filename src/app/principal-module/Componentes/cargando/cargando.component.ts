import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { LoadingService } from '../../../../../../ProyectoDev/src/app/ModuloPrincipal/Servicios/loading.service';

@Component({
  selector: 'app-cargando',
  template: `<div class="loading" >
                <mat-spinner class="mx-auto" [color]="color"></mat-spinner>
                <img 
                src="../../assets/imagenes/pollo.webp" 
                alt="Logotipo Da&ntilde;ado" 
                class="imgPollo mx-auto">
              </div>`
})
export class CargandoComponent implements OnInit, OnDestroy {

  color:ThemePalette = "primary"
  Colores:ThemePalette[]=['accent','warn','primary']
  numero:number=0
  isLoading = this.spinner.isLoading$
  IdInterval: any
  
  constructor(
    private spinner: LoadingService    
  ) { }
  
  ngOnInit(): void {
    this.IdInterval = setInterval(()=>{
      (this.numero == this.Colores.length) ? this.numero -= this.Colores.length : this.numero++
        this.color = this.Colores[this.numero]
      },3000)
  }

  ngOnDestroy(): void {
      clearInterval(this.IdInterval)
  }

}
