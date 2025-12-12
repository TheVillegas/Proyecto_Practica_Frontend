import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../header/header.component';
import { ALIItemAccordeonComponent } from '../ali-item-accordeon/ali-item-accordeon.component';

@NgModule({
    declarations: [
        HeaderComponent,
        ALIItemAccordeonComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        HeaderComponent,
        ALIItemAccordeonComponent
    ]
})
export class ComponentsModule { }
