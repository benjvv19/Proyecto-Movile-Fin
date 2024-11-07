import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoletasadminPage } from './boletasadmin.page';

const routes: Routes = [
  {
    path: '',
    component: BoletasadminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoletasadminPageRoutingModule {}
