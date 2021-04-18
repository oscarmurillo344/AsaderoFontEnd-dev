import { Producto } from './producto';

export class Inventario {
    id:number=0;
    productoId:Producto|null;
    extras:string;
    cantidad:number;
    cantidadExist:number;
    estado?:boolean

    constructor(
        productoId:Producto|null,
        extras:string,
        cantidad:number,
        cantidadExist:number){
            this.productoId=productoId;
            this.extras=extras;
            this.cantidad=cantidad;
            this.cantidadExist=cantidadExist;

    }
}