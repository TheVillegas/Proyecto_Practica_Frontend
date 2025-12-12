import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusquedaALIPage } from './busqueda-ali.page';

const routes: Routes = [
  {
    path: '',
    component: BusquedaALIPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusquedaALIPageRoutingModule {}
