import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerarALiBasicoPage } from './generar-ali-basico.page';
import { ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    component: GenerarALiBasicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), ReactiveFormsModule],
  exports: [RouterModule],
})
export class GenerarALiBasicoPageRoutingModule { }
