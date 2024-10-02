import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmineditarPageRoutingModule } from './admineditar-routing.module';

import { AdmineditarPage } from './admineditar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmineditarPageRoutingModule
  ],
  declarations: [AdmineditarPage]
})
export class AdmineditarPageModule {}
