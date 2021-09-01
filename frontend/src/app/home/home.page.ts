import { DispositivoService } from '../services/dispositivo.service';
import { Dispositivo } from '../model/Dispositivo';
import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public dispositivos:Array<Dispositivo>;
  constructor(private dServ:DispositivoService) {
    this.listaDispo();
  }

async listaDispo(){
  console.log("llama a getDispositivos");
  this.dispositivos = await this.dServ.getListaDispositivo();
  console.log("Volvio de getDispositivos");
  console.log(this.dispositivos);
  }
}
