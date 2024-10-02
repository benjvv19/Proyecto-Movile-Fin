import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MascondicionesPage } from './mascondiciones.page';

const routes: Routes = [
  {
    path: '',
    component: MascondicionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MascondicionesPageRoutingModule {}
