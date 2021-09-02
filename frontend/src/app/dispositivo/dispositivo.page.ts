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
  
  public medicionesDispo: Array<Mediciones>;  //mediciones del dispositivo
  public ultimaMedicionDispo: Mediciones;     // última medición tomada del dispositivo
  public ultimoRiegoDispo: LogRiego;     // última operacion de riego del dispositivo
  
  public estadoEvDispo: number;               // estado de la electroválvula del dispositivo
  public estadoEvDispoStr: string;            // estado de la electroválvula del dispositivo en forma de string
 
  
  
  constructor(private router:ActivatedRoute,
     public dServ:DispositivoService,
     public lServ:LogRiegosService,
     public mServ:MedicionesService,
     public modalCrtl:ModalController) {
       

  
    setTimeout(() => {
      this.valorObtenido = this.ultimaMedicionDispo.valor;
      console.log('Cambio el valor del sensor = ' + this.valorObtenido);
      
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
    console.log("dispositivo= "+ this.dispoId );
    this.getDispo();  //recupera el objeto this.dispositivo y sus variables
  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter ');

  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter: ' + this.valorObtenido);
    this.generarChart(this.valorObtenido);
  }

// recupera el dispositivo de la BD y la información asociadas, utilizando los servicios
  async getDispo(){
    this.dispositivo =  await this.dServ.getDispositivo(this.dispoId);
    this.ultimaMedicionDispo = await this.mServ.getUltimaMedicionId(this.dispoId);
    this.valorObtenido=this.ultimaMedicionDispo.valor;
    console.log("ultimo valor obtenido: " + this.valorObtenido);

    this.ultimoRiegoDispo = await this.lServ.getUltimoRiegoId(this.dispoId);
    this.estadoEvDispo=this.ultimoRiegoDispo.apertura;
  }

// recupera la última medición del servicio y también la lista de mediciones.
//además actualiza el valor que se representará en el manómetro
  async cargarMediciones(){
    this.medicionesDispo = await this.mServ.getMedicionesId(this.dispoId);
    
  }
  async cargarUltimaMedicion(){
    this.ultimaMedicionDispo =  await this.mServ.getUltimaMedicionId(this.dispoId);
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


  /* Obtiene las mediciones del dispositivo y las muestra en la lista del modal*/

  async listarMediciones(){
    console.log("mediciones: ");
    this.medicionesDispo = await this.mServ.getMedicionesId(this.dispoId);
    console.log(this.medicionesDispo);
    console.log("verificando mediciones");
    if(this.medicionesDispo.length==0) alert("No existen registros de Mediciones")
    this.initModalMediciones();
  }

  /* Obtiene el log de riegos del dispositivo y las muestra en la lista del modal*/
  async listarRiegos(){
    console.log("riegos: ");
    this.logRiegoDispo = await this.lServ.getLogRiegosId(this.dispoId);
    console.log("verificando riegos");
    if(this.logRiegoDispo.length==0) alert("No existen registros de Riegos")
    else this.initModalRiegos();
  }

/*  Al pulsar el botón de accionamiento de la electroválvula se togglea la misma,
se genera un nuevo registro de riego y se simula una medición para luego registrarla
*/
  async nuevoRiego(){
    let nrAp:number = 0;
    if(this.ultimoRiegoDispo.apertura==0) nrAp=1;
    
    let fecha: Date = new Date();
    let valv:number = Number(this.dispoId); 
    let nRiego:LogRiego = await new LogRiego(0,nrAp,fecha,valv);
    console.log("nRiego= " + nRiego);
    let result:any = await this.lServ.nuevoLogRiegos(nRiego);
    this.ultimoRiegoDispo = await this.lServ.getUltimoRiegoId(this.dispoId);
    this.estadoEvDispo=this.ultimoRiegoDispo.apertura;
    //ahora genera una medición ficticia y la registra
    let fecha2: Date = new Date();
    let nMedValor = Math.floor(Math.random()*100);
    if(nMedValor<10) nMedValor=10;
    if(nMedValor>100) nMedValor=100;
    console.log("nuevo valor medicion "+ nMedValor);
    let nMedicion:Mediciones = await new Mediciones(0,fecha2,nMedValor,this.dispoId);
    let result2= await this.mServ.nuevaMedicion(nMedicion);
    console.log(result2);
    this.ultimaMedicionDispo = await this.mServ.getUltimaMedicionId(this.dispoId);
    this.valorObtenido=this.ultimaMedicionDispo.valor;
  }


// inicia el modal que muestra los riegos
  async initModalRiegos() {
    const modal = await this.modalCrtl.create({
      component: ModalPage,
      componentProps: {
        titulo: 'Riegos '+ this.dispositivo.ubicacion,
        info: this.logRiegoDispo,
        tipo: 'LogRiegos',
      }
    });
    await modal.present();
  }
  
// inicia el modal que muestra las mediciones
  async initModalMediciones() {
    const modal = await this.modalCrtl.create({
      component: ModalPage,
      componentProps: {
        titulo: 'Mediciones '+ this.dispositivo.ubicacion,
        info: this.medicionesDispo,
        tipo: 'Mediciones',
      }
    });
    await modal.present();
  }






  generarChart(valor:number) {
    this.chartOptions={
      chart: {
          type: 'gauge',
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false
        }
        ,title: {
          text: 'Sensor N° '+ this.dispoId.toString()
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
            text: 'kPA'
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
        name: 'kPA',
        data: [valor],
        tooltip: {
            valueSuffix: ' kPA'
        }
    }]

    };
    this.myChart = Highcharts.chart('highcharts', this.chartOptions );
  }

}

