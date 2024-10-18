import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleboletasPageRoutingModule } from './detalleboletas-routing.module';

import { DetalleboletasPage } from './detalleboletas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleboletasPageRoutingModule
  ],
  declarations: [DetalleboletasPage]
})
export class DetalleboletasPageModule {}
