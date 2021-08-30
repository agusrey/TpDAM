import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valvula'
})
export class ValvulaPipe implements PipeTransform {

  transform(value: number): any {
    if(value==1) return 'ABIERTA'
    else return 'CERRADA';
  }

}
