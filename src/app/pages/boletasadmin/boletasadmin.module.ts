import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoletasadminPageRoutingModule } from './boletasadmin-routing.module';

import { BoletasadminPage } from './boletasadmin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoletasadminPageRoutingModule
  ],
  declarations: [BoletasadminPage]
})
export class BoletasadminPageModule {}
