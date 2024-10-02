import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmindetallesPage } from './admindetalles.page';

const routes: Routes = [
  {
    path: '',
    component: AdmindetallesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmindetallesPageRoutingModule {}
