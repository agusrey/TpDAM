import { Injectable } from '@angular/core';
import { Dispositivo } from '../model/Dispositivo';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {

  urlApi="http:/localhost:3000";

  private listado:Array<Dispositivo> = new Array<Dispositivo>();
  
  constructor(private  _http:HttpClient) {
    var disp:Dispositivo= new Dispositivo(1,"Sensor 1","Patio",1);
    var disp2:Dispositivo= new Dispositivo(2,"Sensor 2","Cocina",2);
    var disp3:Dispositivo= new Dispositivo(3,"Sensor 3","Jardin Delantero",3);
    var disp4:Dispositivo= new Dispositivo(4,"Sensor 4","Living",4);
    var disp5:Dispositivo= new Dispositivo(5,"Sensor 5","Garage",5);
    this.listado.push(disp);
    this.listado.push(disp2);
    this.listado.push(disp3);
    this.listado.push(disp4);
    this.listado.push(disp5);
   }

  getListaDispositivo():Array<Dispositivo>{
    return this.listado;
  }
/*   getListaDispositivo():Promise<Dispositivo[]>{
    return this._http.get(this.urlApi + "/dispositivo/").toPromise()
      .then((lista:Dispositivo[])=>{
        return lista;
    });
  }
 */  

  getDispositivo(id):Dispositivo{
    return this.listado.filter(dispositivo=> dispositivo.dispositivoId==id)[0];
  }
/*    getDispositivo(id):Promise<Dispositivo>{
    return this._http.get(this.urlApi + "/dispositivo/"+id).toPromise()
      .then((dispo:Dispositivo)=>{
        return dispo;
    });
  } 
 */ 
}




/*
Versión hecha con variables en memoria - antes de usar BD y HTTP REQ

export class DispositivoService {
  listado:Array<Dispositivo> = new Array<Dispositivo>();
  
  constructor() {
    var disp:Dispositivo= new Dispositivo(1,"Sensor 1","Patio",1);
    var disp2:Dispositivo= new Dispositivo(2,"Sensor 2","Cocina",2);
    var disp3:Dispositivo= new Dispositivo(3,"Sensor 3","Jardin Delantero",3);
    var disp4:Dispositivo= new Dispositivo(4,"Sensor 4","Living",4);
    var disp5:Dispositivo= new Dispositivo(5,"Sensor 5","Garage",5);
    this.listado.push(disp);
    this.listado.push(disp2);
    this.listado.push(disp3);
    this.listado.push(disp4);
    this.listado.push(disp5);
   }

  getListaDispositivo():Array<Dispositivo>{
    return this.listado;
  }
  getDispositivo(id):Dispositivo{
    return this.listado.filter(dispositivo=> dispositivo.dispositivoId==id)[0];
  }
  

} 


*/
