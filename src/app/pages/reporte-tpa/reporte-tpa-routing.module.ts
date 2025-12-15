import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporteTPAPage } from './reporte-tpa.page';

const routes: Routes = [
  {
    path: '',
    component: ReporteTPAPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporteTPAPageRoutingModule {}
