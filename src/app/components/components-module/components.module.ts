import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../header/header.component';
import { ALIItemAccordeonComponent } from '../ali-item-accordeon/ali-item-accordeon.component';
import { TitulosReportesComponent } from '../titulos-reportes/titulos-reportes.component';

@NgModule({
    declarations: [
        HeaderComponent,
        ALIItemAccordeonComponent,
        TitulosReportesComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        HeaderComponent,
        ALIItemAccordeonComponent,
        TitulosReportesComponent
    ]
})
export class ComponentsModule { }
