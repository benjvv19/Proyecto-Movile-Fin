import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MasdetallesPageRoutingModule } from './masdetalles-routing.module';

import { MasdetallesPage } from './masdetalles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MasdetallesPageRoutingModule
  ],
  declarations: [MasdetallesPage]
})
export class MasdetallesPageModule {}
