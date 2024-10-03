import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasdetallesPage } from './masdetalles.page';

const routes: Routes = [
  {
    path: '',
    component: MasdetallesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasdetallesPageRoutingModule {}
