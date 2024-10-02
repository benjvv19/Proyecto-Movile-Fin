import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmineditarPage } from './admineditar.page';

const routes: Routes = [
  {
    path: '',
    component: AdmineditarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmineditarPageRoutingModule {}
