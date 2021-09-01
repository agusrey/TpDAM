import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dispositivo } from '../model/Dispositivo';
@Injectable({
  providedIn: 'root'
})
export class DispositivoService {

  urlApi="http://localhost:8000";

  constructor(private  _http:HttpClient) { }
/*
Los siguiente métodos realizan Http Requests a la api Rest del backend que nos permite acceder
a la base de datos. 
Se utiliza una promesa para manejar la naturaleza asincrónica de esta aplicación, queremos
que nuestro código espere por el resultado (usaremos asyn/await cuando se llama a estos métodos)
*/

// Devuelve la lista de dispositivos 
getListaDispositivo():Promise<Dispositivo[]>{
  console.log("Promesa getListaDsipositivo iniciada");
  let str:string = this.urlApi + "/dispositivo/";
  console.log("el string del endpoint es: "+str);
  return this._http.get(str).toPromise()
    .then((lista:Dispositivo[])=>{
      console.log("Promesa getListaDsipositivo finalizada");
      console.log(lista);
      return lista;
  });
}


// Devuelve el dispositivo que posee la id especificada

getDispositivo(id:string):Promise<Dispositivo>{
  console.log("Promesa getDispositivoId iniciada");
  let str:string = this.urlApi + "/dispositivo/" +id;
  console.log("el string del endpoint es: "+str);
  return this._http.get<Dispositivo>(str).toPromise()
    .then((dispo:Dispositivo)=>{
      console.log("Promesa getDispositivoId finalizada");
      console.log(dispo);
      return dispo;
    });
  };

}
