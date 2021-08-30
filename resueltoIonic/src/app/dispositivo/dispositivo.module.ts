import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DispositivoPageRoutingModule } from './dispositivo-routing.module';

import { DispositivoPage } from './dispositivo.page';
import { ModalPageModule } from '../modal/modal.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DispositivoPageRoutingModule,
    ModalPageModule
  ],
  declarations: [DispositivoPage]
})
export class DispositivoPageModule {}