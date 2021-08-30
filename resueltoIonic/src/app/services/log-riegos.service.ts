import { Injectable } from '@angular/core';
import { LogRiego } from '../model/LogRiego';

@Injectable({
  providedIn: 'root'
})
export class LogRiegosService {
  private logRiegos:Array<LogRiego> = new Array<LogRiego>();
  
  constructor() {
    var lr1:LogRiego = new LogRiego(1,0,new Date(),1);
    var lr2:LogRiego = new LogRiego(2,1,new Date(),1);
    var lr3:LogRiego = new LogRiego(3,0,new Date(),2);
    var lr4:LogRiego = new LogRiego(4,0,new Date(),3);
    var lr5:LogRiego = new LogRiego(5,0,new Date(),4);
    var lr6:LogRiego = new LogRiego(6,0,new Date(),5);
    var lr7:LogRiego = new LogRiego(7,1,new Date(),4);
    var lr8:LogRiego = new LogRiego(8,1,new Date(),5);

    this.logRiegos.push(lr1);
    this.logRiegos.push(lr2);
    this.logRiegos.push(lr3);
    this.logRiegos.push(lr4);
    this.logRiegos.push(lr5);
    this.logRiegos.push(lr6);
    this.logRiegos.push(lr7);
    this.logRiegos.push(lr8);
   
  }

  getLogRiegos():Array<LogRiego>{
    return this.logRiegos;
  }

  getUltimoLogRiegos():LogRiego{
    let milog:LogRiego = this.logRiegos[this.logRiegos.length-1];
    return milog;
  }

  getLogRiegosId(id){
    let milog:Array<LogRiego> =this.logRiegos.filter(logRiegos=> logRiegos.electrovalvulaId==id);
    return milog;
  }
  addLogRiegos(lr:LogRiego){
    this.logRiegos.push(lr);
  }


}
