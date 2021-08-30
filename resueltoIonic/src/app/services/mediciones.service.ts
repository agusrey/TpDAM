import { Injectable } from '@angular/core';
import { Mediciones } from '../model/Mediciones';

@Injectable({
  providedIn: 'root'
})
export class MedicionesService {
  private listaMediciones:Array<Mediciones> = new Array<Mediciones>();
  constructor() {
    var m1:Mediciones = new Mediciones('1',new Date(),10,1);
    var m2:Mediciones = new Mediciones('2',new Date(),20,1);
    var m3:Mediciones = new Mediciones('3',new Date(),30,2);
    var m4:Mediciones = new Mediciones('4',new Date(),40,3);
    var m5:Mediciones = new Mediciones('5',new Date(),50,4);
    var m6:Mediciones = new Mediciones('6',new Date(),60,5);
    var m7:Mediciones = new Mediciones('7',new Date(),70,3);
    var m8:Mediciones = new Mediciones('8',new Date(),80,3);

    this.listaMediciones.push(m1);
    this.listaMediciones.push(m2);
    this.listaMediciones.push(m3);
    this.listaMediciones.push(m4);
    this.listaMediciones.push(m5);
    this.listaMediciones.push(m6);
    this.listaMediciones.push(m7);
    this.listaMediciones.push(m8);

   }
    
   getMediciones(){
    return this.listaMediciones;
  }
  
  getUltimaMedicion(){
    return this.listaMediciones[this.listaMediciones.length-1];
  }
  
  getMedicionesId(id){
    console.log(this.listaMediciones.filter(Mediciones=> Mediciones.dispositivoId==id));

    return this.listaMediciones.filter(Mediciones=> Mediciones.dispositivoId==id);
  }
  addMedicion(med:Mediciones){
    this.listaMediciones.push(med);
  }

}