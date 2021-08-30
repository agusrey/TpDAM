//correr antes npm install --save highcharts

import { Mediciones } from './../model/Mediciones';
import { LogRiegosService } from './../services/log-riegos.service';


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dispositivo } from '../model/Dispositivo';
import { DispositivoService } from '../services/dispositivo.service';
import * as Highcharts from 'highcharts';
import { MedicionesService } from '../services/mediciones.service';
import { ViewDidEnter, ViewWillEnter } from '@ionic/angular';
import { LogRiego } from '../model/LogRiego';

import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { async } from '@angular/core/testing';


declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);


@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
})
export class DispositivoPage implements OnInit, ViewDidEnter, ViewWillEnter {
  
  private valorObtenido:number=0;
  public myChart;
  private chartOptions;

  public dispositivo:Dispositivo;             //dispositivo
  public dispoId:string;
  public logRiegoDispo: Array<LogRiego>;      //log de riego del dispositivo
  public logRiegoDispoUltimo:LogRiego;      //log de riego del dispositivo
  public logRiegoUltimo: LogRiego;            //último log de riego almacenado
  public medicionesDispo: Array<Mediciones>;  //mediciones del dispositivo
  public ultimaMedicionDispo: Mediciones;     // última medición tomada del dispositivo
  public ultimaMedicion: Mediciones;          // última medición de las tomadas por cualquier dispositivo
  public estadoEvDispo: number;               // estado de la electroválvula del dispositivo
  public estadoEvDispoStr: string;            // estado de la electroválvula del dispositivo en forma de string
 
  
  
  constructor(private router:ActivatedRoute,
     private dServ:DispositivoService,
     private lServ:LogRiegosService,
     private mServ:MedicionesService,
     private modalCrtl:ModalController) {
  
    setTimeout(() => {
      console.log('Cambio el valor del sensor');
      this.valorObtenido = this.ultimaMedicionDispo.valor;
      //llamo al update del chart para refrescar y mostrar el nuevo valor
      this.myChart.update({
        series: [
          {
            name: 'Humedad %',
            data: [this.valorObtenido],
            tooltip: {
              valueSuffix: ' % ',
            },
          },
        ],
      });
    }, 5000);
   }

  ngOnInit() {
    this.dispoId = this.router.snapshot.paramMap.get('id');
    this.getDispo();  //recupera el objeto this.dispositivo
    this.cargarMediciones(); //recupera las variables relacionadas con las mediciones
    this.cargarRiegos();    //recupera las variables relacionadas con los riegos
    this.valorObtenido = this.ultimaMedicionDispo.valor;
        
  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter ');
  }

  ionViewDidEnter() {
    this.generarChart(); 
  }

  /* métodos para poder usar async/await*/

  async getDispo(){
    this.dispositivo = this.dServ.getDispositivo(this.dispoId);
  }
  
  cargarMediciones(){
    
    this.medicionesDispo = this.mServ.getMedicionesId(this.dispositivo.dispositivoId);
    this.ultimaMedicionDispo =  this.medicionesDispo[this.medicionesDispo.length-1];
    this.ultimaMedicion =   this.mServ.getUltimaMedicion();
    this.valorObtenido=this.ultimaMedicionDispo.valor;
}

  cargarRiegos(){
    this.logRiegoDispo= this.lServ.getLogRiegosId(this.dispositivo.electrovalvulaId);
    this.logRiegoUltimo=this.lServ.getUltimoLogRiegos();
    this.logRiegoDispoUltimo=this.logRiegoDispo[this.logRiegoDispo.length-1];
    //console.log("el último log del dispositivo es");
    //console.log(this.logRiegoDispoUltimo);
    this.estadoEvDispo=this.logRiegoDispoUltimo.apertura;
    if(this.estadoEvDispo == 1) this.estadoEvDispoStr= "ABIERTA";
    else this.estadoEvDispoStr= "CERRADA";

  }

  /* conmuta la electroválvula del dispositivo en cuestión*/
  conmutarEv(){
    if(this.estadoEvDispo == 1){
      this.estadoEvDispo=0; 
      this.estadoEvDispoStr ="CERRADA"; 
    }
    else{
      this.estadoEvDispo=1; 
      this.estadoEvDispoStr ="ABIERTA"; 
    }
        
    console.log('NUEVO estado de la valvula ' + this.estadoEvDispoStr);
    this.nuevoRiego();
  }

  listarMediciones(){
    console.log("mediciones: ");
    console.log(this.medicionesDispo);
    this.initModalMediciones();
  }
  listarRiegos(){
    console.log("riegos: ");
    console.log(this.logRiegoDispo);
    this.initModalRiegos();
  }


  nuevoRiego(){
    let nrId = this.logRiegoUltimo.LogRiegoId + 1;
    console.log("nuevo log Id: "+ nrId);
    let nrAp:number;
    if(this.logRiegoDispoUltimo.apertura==0) nrAp=1;
    else nrAp=0;
    let fecha: Date = new Date();
    let evId:number = this.logRiegoDispoUltimo.electrovalvulaId;

    let miRiego:LogRiego = new LogRiego(nrId,nrAp,fecha,evId);
    console.log("este es el nuevo log");
    console.log(miRiego);
    this.lServ.addLogRiegos(miRiego); //inserta el nuevo riego
    this.cargarRiegos();              //actualiza todas las variables de los riegos

    let nMedId = this.ultimaMedicion.medicionesId;
    nMedId++;
    let nMedValor = Math.floor(Math.random()*21) - 10 + this.ultimaMedicionDispo.valor;
    if(nMedValor<0) nMedValor=0;
    if(nMedValor>100) nMedValor=100;
    
    let nMedDispo = this.dispositivo.dispositivoId;

    let nuevaMedicion:Mediciones = new Mediciones(nMedId,fecha,nMedValor,nMedDispo);
    this.mServ.addMedicion(nuevaMedicion);
    this.cargarMediciones();
    this.myChart.update({
      series: [
        {
          name: 'Humedad %',
          data: [this.valorObtenido],
          tooltip: {
            valueSuffix: ' % ',
          },
        },
      ],
    });
    
  }

  async initModalRiegos() {
    const modal = await this.modalCrtl.create({
      component: ModalPage,
      componentProps: {
        titulo: 'Riegos '+ this.dispositivo.ubicacion,
        info: this.logRiegoDispo,
        tipo: 'LogRiegos',
      }
    });

/*   modal.onDidDismiss().then((modalDataResponse) => {
      if (modalDataResponse !== null) {
        this.modalDataResponse = modalDataResponse.data;
        console.log('Modal Sent Data : '+ modalDataResponse.data);
      }
    }); */
    await modal.present();
  }

  async initModalMediciones() {
    const modal = await this.modalCrtl.create({
      component: ModalPage,
      componentProps: {
        titulo: 'Mediciones '+ this.dispositivo.ubicacion,
        info: this.medicionesDispo,
        tipo: 'Mediciones',
      }
    });

/*   modal.onDidDismiss().then((modalDataResponse) => {
      if (modalDataResponse !== null) {
        this.modalDataResponse = modalDataResponse.data;
        console.log('Modal Sent Data : '+ modalDataResponse.data);
      }
    }); */
    await modal.present();
  }




    /* obtiene el estado de la electroválvula desde el último elemento del log de riegos de ese dispositivo*/

/*     nuevoLogRiego(){

    let nuevoLog = new LogRiego(this.
    let date:Date = new Date();
    console.log('date: ' + date);
    let nuevoLog:LogRiego;
    this.miHistorialRiegos=this.lServ.getLogRiegos();
    console.log('leo historial de riegos');
    console.log(this.miHistorialRiegos);
    nuevoLog.fecha =  new Date();
    if(this.estadoEv == 1) this.estadoEv = 0;
    else this.estadoEv = 1;
    nuevoLog.apertura = this.estadoEv;
    nuevoLog.electrovalvulaId=this.dispositivo.electrovalvulaId;
    nuevoLog.LogRiegoId = this.miHistorialRiegos[this.miHistorialRiegos.length-1].LogRiegoId++;

    this.lServ.addLogRiegos(nuevoLog);
    this.estadoEv=nuevoLog.apertura;
    let verlog = this.lServ.getLogRiegos();
    console.log('este es el historial de riegos');
    console.log(verlog);
  }

 */


  generarChart() {
    console.log('estoy en generar chart');
    this.chartOptions={
      chart: {
          type: 'gauge',
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false
        }
        ,title: {
          text: 'Sensor Humedad'
        }

        ,credits:{enabled:false}
        
           
        ,pane: {
            startAngle: -150,
            endAngle: 150
        } 
        // the value axis
      ,yAxis: {
        min: 0,
        max: 100,
  
        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',
  
        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2,
            rotation: 'auto'
        },
        title: {
            text: 'Humedad %'
        },
        plotBands: [{
            from: 0,
            to: 10,
            color: '#55BF3B' // green
        }, {
            from: 10,
            to: 30,
            color: '#DDDF0D' // yellow
        }, {
            from: 30,
            to: 100,
            color: '#DF5353' // red
        }]
    }
    ,
  
    series: [{
      name: 'Humedad %',
      data: [this.valorObtenido],
      tooltip: {
        valueSuffix: ' % ',
      },

    }]

    };
    this.myChart = Highcharts.chart('highcharts', this.chartOptions );
  }


}
