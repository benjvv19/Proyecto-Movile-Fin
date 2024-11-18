import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarCategoriaPage } from './agregarcategoria.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarCategoriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarcategoriaPageRoutingModule {}
