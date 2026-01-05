import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReporteTPAPageRoutingModule } from './reporte-tpa-routing.module';

import { ReporteTPAPage } from './reporte-tpa.page';
import { ComponentsModule } from 'src/app/components/components-module/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReporteTPAPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ReporteTPAPage]
})
export class ReporteTPAPageModule { }
