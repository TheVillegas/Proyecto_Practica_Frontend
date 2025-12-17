import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AliService } from 'src/app/services/ali-service';

@Component({
  selector: 'app-reporte-ram',
  templateUrl: './reporte-ram.page.html',
  styleUrls: ['./reporte-ram.page.scss'],
  standalone: false
})
export class ReporteRamPage implements OnInit {

  constructor(private aliService: AliService, private route: ActivatedRoute) { }
  codigoALI: string = '';
  estadoRAM: string = '';
  ultimaActtualizacionRam: string = '';
  responsableModificacionRam: string = '';


  ngOnInit() {
    this.codigoALI = this.route.snapshot.paramMap.get('codigoALI')!;
    if (this.codigoALI) {
      const id = parseInt(this.codigoALI);
      this.estadoRAM = this.aliService.getEstadoRAM(id);
    }
  }

}
