import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarcategoriaPage } from './editarcategoria.page';

const routes: Routes = [
  {
    path: '',
    component: EditarcategoriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarcategoriaPageRoutingModule {}
