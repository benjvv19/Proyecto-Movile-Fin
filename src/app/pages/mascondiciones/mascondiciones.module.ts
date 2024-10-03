import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MascondicionesPageRoutingModule } from './mascondiciones-routing.module';

import { MascondicionesPage } from './mascondiciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MascondicionesPageRoutingModule
  ],
  declarations: [MascondicionesPage]
})
export class MascondicionesPageModule {}
