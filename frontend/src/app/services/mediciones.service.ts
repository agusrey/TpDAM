import { Injectable } from '@angular/core';
import { Mediciones } from '../model/Mediciones';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MedicionesService {
  urlApi="http://localhost:8000";
  constructor(private  _http:HttpClient) {}  //inyectamos HttpClient
  
/*
Devuelve una promesa de lista de mediciones para un dispositivo, haciento un http get a la api rest
*/

  getMedicionesId(id:string):Promise<Mediciones[]>{
    let str:string = this.urlApi + "/medicion/" + id;
    console.log("Promesa getMedicionesId iniciada");
    console.log("el string del endpoint es: "+str);
    return this._http.get(str).toPromise()
      .then((lista:Mediciones[])=>{
        console.log("Promesa getMedicionesId finalizada");
        console.log(lista);
        return lista;
    });
  }

  /*
Devuelve una promesa de última medicion para un dispositivo, haciento un http get a la api rest
*/

  getUltimaMedicionId(id:string):Promise<Mediciones>{
    let str:string = this.urlApi + "/medicion/" + id +"/ultima";
    console.log("Promesa getUltimaMedicioId iniciada");
    console.log("el string del endpoint es: "+str);
    return this._http.get(str).toPromise()
      .then((lista:Mediciones[])=>{
        console.log("Promesa getUltimaMedicioId finalizada");
        console.log(lista[0]);
        return lista[0];
    });
  }

  
  /*
  registra una nueva medición, recibe el objeto med de tipo mediciones con los valores
  a registrar y hace un http post a la api rest para su procesamiento
  El id de la medicion lo detemina la BD (valor autoincrementable)
  */
  nuevaMedicion(med:Mediciones){
    let str:string = this.urlApi + "/medicion/nueva";
    let _dispoId = med.dispositivoId;
    let _fecha = med.fecha;
    let _val:string  = med.valor.toString();
    console.log("Promesa nuevaMedicio iniciada: " + _dispoId +" valor: "+_val);   
    console.log("el string del endpoint es: "+str);
    return this._http.post(str, {fecha: _fecha, dipositivoId:_dispoId, valor:_val} ).toPromise()
      .then((result)=>{
        console.log("Promesa nuevaMedicion finalizada: ");   
        return result;
    });
    
  }
    
}