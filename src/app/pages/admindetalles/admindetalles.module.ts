import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmindetallesPageRoutingModule } from './admindetalles-routing.module';

import { AdmindetallesPage } from './admindetalles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmindetallesPageRoutingModule
  ],
  declarations: [AdmindetallesPage]
})
export class AdmindetallesPageModule {}
