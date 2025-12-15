import { Component, OnInit } from '@angular/core';
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

  seccionActual: String = '';
  codigoALI: string = '';
  estadoTPA: string = '';
  estadoSeleccionado: string = '';
  listaRepeticionesEtapa2: any[] = [
    { id: 0, reposable: "", listaMateriales: [{ id: 0, tipoMaterial: "", codigoMaterial: "" }] }
  ];
  etapaActual: string = 'etapa1';

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

  siguienteSeccion() {
    switch (this.seccionActual) {
      case 'etapa1':
        this.seccionActual = "etapa2"
        break;
      case 'etapa2':
        this.seccionActual = "etapa3"
        break;
      case 'etapa3':
        this.seccionActual = "etapa4"
        break;
      case 'etapa4':
        this.seccionActual = "etapa5"
        break;
      case 'etapa5':
        this.seccionActual = "etapa1"
        break;
    }
  }
  agregarRepeticion() {
    const nuevoID = this.listaRepeticionesEtapa2.length + 1;
    this.listaRepeticionesEtapa2.push({
      id: Date.now(),
      listaMateriales: [
        { id: Date.now(), tipoMaterial: '', codigoMaterial: '' }
      ]
    });
    console.log(this.listaRepeticionesEtapa2);
  }
  agregarMaterial(indexAnalista: number) {
    // Buscamos al analista específico y le empujamos a SU lista
    this.listaRepeticionesEtapa2[indexAnalista].listaMateriales.push({
      id: Date.now(),
      tipoMaterial: '',
      codigoMaterial: ''
    });
  }
  trackById(index: number, item: any) {
    return item.id;
  }

}
