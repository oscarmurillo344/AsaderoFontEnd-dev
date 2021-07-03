import { Producto } from './producto';

export class Inventario {
    id:number=0;
    producto:Producto;
    extras:string;
    cantidad:number;
    cantidadExiste:number;
    cantidadTotal:number=0;
    estado?:boolean

    constructor(
        producto:Producto,
        extras:string,
        cantidad:number,
        cantidadExist:number){
            this.producto=producto;
            this.extras=extras;
            this.cantidad=cantidad;
            this.cantidadExiste=cantidadExist;
    }
}