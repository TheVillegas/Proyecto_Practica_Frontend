import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporteRamPage } from './reporte-ram.page';

const routes: Routes = [
  {
    path: '',
    component: ReporteRamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporteRamPageRoutingModule {}
