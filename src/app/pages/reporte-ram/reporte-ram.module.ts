import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReporteRamPageRoutingModule } from './reporte-ram-routing.module';

import { ReporteRamPage } from './reporte-ram.page';
import { ComponentsModule } from '../../components/components-module/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReporteRamPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ReporteRamPage]
})
export class ReporteRamPageModule { }
