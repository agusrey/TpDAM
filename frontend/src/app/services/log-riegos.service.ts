import { Injectable } from '@angular/core';
import { LogRiego } from '../model/LogRiego';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogRiegosService {
  urlApi="http://localhost:8000";    
  constructor(private  _http:HttpClient) { //inyectamos HttpClient
   
  }

/*
Devuelve una promesa de lista de riegos para un dispositivo, haciento un http get a la api rest
*/

  getLogRiegosId(id:string):Promise<LogRiego[]>{
    console.log("Promesa getLogRiegosId iniciada");
    let str:string = this.urlApi + "/riego/" + id;
    console.log("el string del endpoint es: "+str);
    return this._http.get(str).toPromise()
      .then((lista:LogRiego[])=>{
        console.log("Promesa getLogRiegosId finalizada");
        console.log(lista);
        return lista;
    });
  }
/*
  Devuelve una promesa del ultimo riego para un dispositivo, haciento un http get a la api rest
*/

  getUltimoRiegoId(id:string):Promise<LogRiego>{
    console.log("Promesa geUltimoRiegoId iniciada");
    let str:string = this.urlApi + "/riego/" + id +"/ultimo";
    console.log("el string del endpoint es: "+str);
    return this._http.get(str).toPromise()
      .then((lista:LogRiego[])=>{
        console.log("Promesa getLogRiegosId finalizada");
        console.log(lista[0]);
        return lista[0];
    });
  }


/*
  registra una nuevo riego, recibe el objeto lr de tipo LogRiego con los valores
  a registrar y hace un http post a la api rest para su procesamiento
  El id del riego lo detemina la BD (valor autoincrementable)
  */
  nuevoLogRiegos(lr:LogRiego){
    let str:string = this.urlApi + "/riego/nuevo";
    console.log("Promesa nuevoLogRiegos iniciada");
    console.log("el string del endpoint es: "+str);
    return this._http.post(str, {electrovalvulaId:lr.electrovalvulaId, fecha:lr.fecha , apertura:lr.apertura} ).toPromise()
      .then((result)=>{
        console.log("Promesa nuevoLogRiegos finalizada");
        return result;
    });
  }
}

