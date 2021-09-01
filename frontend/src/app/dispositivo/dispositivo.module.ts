import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DispositivoPageRoutingModule } from './dispositivo-routing.module';

import { DispositivoPage } from './dispositivo.page';
import { ModalPageModule } from '../modal/modal.module';
import { ValvulaPipe } from '../pipes/valvula.pipe';
import { ResaltaDirective } from '../directives/resalta.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DispositivoPageRoutingModule,
    ModalPageModule
  ],
  declarations: [DispositivoPage, ValvulaPipe, ResaltaDirective]
})
export class DispositivoPageModule {}
