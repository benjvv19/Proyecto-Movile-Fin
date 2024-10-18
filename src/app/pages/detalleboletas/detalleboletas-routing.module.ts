import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleboletasPage } from './detalleboletas.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleboletasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleboletasPageRoutingModule {}
