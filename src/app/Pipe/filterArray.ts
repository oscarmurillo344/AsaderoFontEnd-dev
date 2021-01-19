import {Pipe,PipeTransform } from '@angular/core';


@Pipe({
    name:'convertir'
})

export class FilterArray implements PipeTransform{

    transform(value: any):any {
        if(value === '' || value.length < -1)return value;
        let restult='';
            if(value.length == 1){
                restult='User';
              }
            if(value.length > 1){
                    restult='User,Admin';
            }
        return restult;
    }

}