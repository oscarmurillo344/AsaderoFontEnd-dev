import {Pipe,PipeTransform } from '@angular/core';
import { of } from 'rxjs';


@Pipe({
    name:'convertir'
})

export class FilterArray implements PipeTransform{

    rol:string=""
    transform(value: any[]):any {
        if(value == null || value.length < -1)return value;
        let result = ''
        value.forEach(
            (data:any)=>{
             this.rol = data.rolNombre
             result += this.rol.substring(5) +' '
            }
        );
        return result;
    }

}