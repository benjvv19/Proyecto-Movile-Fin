import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarcategoriaPageRoutingModule } from './editarcategoria-routing.module';

import { EditarcategoriaPage } from './editarcategoria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarcategoriaPageRoutingModule
  ],
  declarations: [EditarcategoriaPage]
})
export class EditarcategoriaPageModule {}
