import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AliService } from 'src/app/services/ali-service';
import { RamService } from 'src/app/services/ram-service';
import { CatalogosService } from 'src/app/services/catalogos.service';
@Component({
  selector: 'app-reporte-ram',
  templateUrl: './reporte-ram.page.html',
  styleUrls: ['./reporte-ram.page.scss'],
  standalone: false
})
export class ReporteRamPage implements OnInit {

  constructor(
    private aliService: AliService,
    private route: ActivatedRoute,
    private ramService: RamService,
    private catalogosService: CatalogosService,
    private navCtrl: NavController
  ) { }
  seccionActual: String = '';
  codigoALI: string = '';
  estadoRAM: string = '';
  listaEquiposIncubacion: any[] = [];
  listaPipetas: any[] = [];
  listaResponsables: any[] = [];
  ultimaActtualizacionRam: string = '';
  responsableModificacionRam: string = '';

  formularioBloqueado: boolean = false;
  etapa1: any = {
    horaInicioHomogenizado: '',
    agarPlateCount: null,
    equipoIncubacion: null,
    nMuestra10gr: null,
    nMuestra50gr: null,
    horaTerminoSiembraRam: ''
  };
  etapa2: any = {
    fechaInicioIncubacion: '',
    horaInicioIncubacion: '',
    responsableIncubacion: null,
    fechaFinIncubacion: '',
    horaFinIncubacion: '',
    responsableAnalisis: null


  };

  // --- ETAPA 3 (Calculo de Muestras) ---
  listaRepeticionesEtapa3: any[] = [
    {
      id: Date.now(),
      codigoALI: null,
      numeroMuestra: 1, // Auto-incremental or specific logic
      // Add other fields if necessary for calculation
    }
  ];

  etapa4: any = {
    controlAmbientalPesado: null,
    horaInicio: '',
    horaFin: '',
    temperatura: null,
    ufc: null,
    controlSiembraEcoli: null,
    blancoUfc: null
  };

  agregarRepeticionEtapa3() {
    const nuevoNumero = this.listaRepeticionesEtapa3.length + 1;
    this.listaRepeticionesEtapa3.push({
      id: Date.now(),
      codigoALI: null,
      numeroMuestra: nuevoNumero
    });
    const nuevoIndice = this.listaRepeticionesEtapa3.length - 1;
    const id = "etapa3" + nuevoIndice;
    this.seccionActual = id;
  }

  ngOnInit() {
    this.codigoALI = this.route.snapshot.paramMap.get('codigoALI')!;
    if (this.codigoALI) {
      const id = parseInt(this.codigoALI);
      this.estadoRAM = this.aliService.getEstadoRAM(id);
      this.ultimaActtualizacionRam = this.ramService.getUltimaActualizacionRAM(id) || '';
      this.responsableModificacionRam = this.ramService.getResponsableRAM(id) || '';
      this.listaEquiposIncubacion = this.catalogosService.getEquiposIncubacion();
      this.listaPipetas = this.catalogosService.getMicroPipetas();
      this.listaResponsables = this.catalogosService.getResponsables();
    }
  }


  openDatePicker(event: any) {
    const element = event.target;
    // Si es un elemento nativo con showPicker
    if (element && typeof element.showPicker === 'function') {
      element.showPicker();
    }
    // Si es un componente Ionic (ion-input)
    else if (element && element.getInputElement) {
      element.getInputElement().then((input: HTMLInputElement) => {
        if (input && typeof input.showPicker === 'function') {
          input.showPicker();
        }
      });
    }
  }

  async confirmarCancelar() {
    console.log('Cancelar clicked');
    // Implementar lógica de cancelar (ej. navegar atrás)
    this.navCtrl.back();
  }

  async confirmarGuardarBorrador() {
    console.log('Guardar Borrador clicked');
    // Implementar lógica de guardar borrador
  }

  async confirmarFormulario() {
    console.log('Confirmar Formulario clicked');
    // Implementar lógica de confirmar formulario
  }

  salirVerificado() {
    console.log('Salir clicked');
    this.navCtrl.back();
  }

}

