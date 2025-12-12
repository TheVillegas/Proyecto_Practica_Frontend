import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusquedaALIPageRoutingModule } from './busqueda-ali-routing.module';

import { BusquedaALIPage } from './busqueda-ali.page';
import { ComponentsModule } from 'src/app/components/components-module/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusquedaALIPageRoutingModule,
    ComponentsModule
  ],
  declarations: [BusquedaALIPage]
})
export class BusquedaALIPageModule { }
