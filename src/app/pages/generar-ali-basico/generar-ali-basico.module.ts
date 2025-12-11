import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerarALiBasicoPageRoutingModule } from './generar-ali-basico-routing.module';

import { GenerarALiBasicoPage } from './generar-ali-basico.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerarALiBasicoPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [GenerarALiBasicoPage]
})
export class GenerarALiBasicoPageModule { }
