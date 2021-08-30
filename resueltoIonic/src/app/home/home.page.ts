import { Component } from '@angular/core';
import { DispositivoService } from '../services/dispositivo.service';
import { Dispositivo } from '../model/Dispositivo';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public dispositivos:Array<Dispositivo>;

  constructor(private dServ:DispositivoService) {
    this.getDispositivos();
  }

  async getDispositivos(){
    console.log("buscando dispositivos");
    this.dispositivos = await this.dServ.getListaDispositivo();
    console.log("this.dispositivos");
  }

}
