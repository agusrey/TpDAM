import { Component, OnInit, Input} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ValvulaPipe } from '../pipes/valvula.pipe';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() titulo:string;
  @Input() info:any;
  @Input() tipo:string;
  constructor(private modalCtrl: ModalController) {
    let valor:number = 1;
  }

  ngOnInit() {
  }

  async close() {
    const closeModal: string = "Modal Closed";
    await this.modalCtrl.dismiss(closeModal);
  }
}
