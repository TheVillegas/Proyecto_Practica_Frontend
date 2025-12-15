import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AliService } from 'src/app/services/ali-service';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-reporte-tpa',
  templateUrl: './reporte-tpa.page.html',
  styleUrls: ['./reporte-tpa.page.scss'],
  standalone: false
})
export class ReporteTPAPage implements OnInit {

  codigoALI: string = '';
  estadoTPA: string = '';
  estadoSeleccionado: string = '';
  @ViewChild(IonContent, { static: false }) content!: IonContent;
  constructor(private route: ActivatedRoute, private aliService: AliService) { }

  ngOnInit() {
    this.codigoALI = this.route.snapshot.paramMap.get('codigoALI')!;
    if (this.codigoALI) {
      this.estadoTPA = this.aliService.getEstadoTPA(parseInt(this.codigoALI));
    }
  }

  cambiarEstado(event: any) {
    this.estadoSeleccionado = event.detail.value || '';
    console.log(this.estadoSeleccionado);
  }
  bajarAlFinal() {
    this.content.scrollToBottom(500);
  }
  subirAlInicio() {
    this.content.scrollToTop(500);
  }
}
