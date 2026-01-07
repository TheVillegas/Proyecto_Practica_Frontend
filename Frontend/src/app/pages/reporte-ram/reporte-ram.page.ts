import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AliService } from 'src/app/services/ali-service';
import { RamService } from 'src/app/services/ram-service';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { ImagenUploadService } from 'src/app/services/imagen-upload';
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
    private router: Router,
    private catalogosService: CatalogosService,
    private alertController: AlertController,
    private navCtrl: NavController,
    private imagenUploadService: ImagenUploadService
  ) { }
  seccionActual: String = '';
  codigoALI: string = '';
  estadoRAM: string = '';
  listaEquiposIncubacion: any[] = [];
  listaPipetas: any[] = [];
  listaControlAnalisis: any[] = [];
  listaResponsables: any[] = [];
  ultimaActtualizacionRam: string = '';
  responsableModificacionRam: string = '';
  listaFormasCalculo: any[] = [];
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
    controlUFC: null,
    horaInicio: '',
    horaFin: '',
    temperatura: null,
    ufc: null,
    controlSiembraEcoli: null,
    blancoUfc: null
  };


  etapa5: any = {
    desfavorable: null,
    tablaPagina: null,
    limite: null,
    fechaEntrega: '',
    horaEntrega: '',
    mercado: null,
    imagenManual: null
  };

  etapa6: any = {
    duplicadoAli: '',
    analisis: 'RAM',
    duplicadoEstado: null,

    controlBlanco: '',
    controlBlancoEstado: null,

    controlSiembra: '',
    controlSiembraEstado: null
  };

  etapa7: any = {
    firmaCoordinador: null,
    observacionesFinales: '',
    formaCalculoAnalista: [],
    formaCalculoCoordinador: null
  };
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
      this.listaControlAnalisis = this.catalogosService.getControlAnalisis();
      this.listaFormasCalculo = this.catalogosService.getFormasCalculo();

      if (this.estadoRAM === 'Verificado') {
        this.formularioBloqueado = true;
      }

      const datosGuardados = this.ramService.getDatosReporteRAM(id);
      if (datosGuardados) {
        this.etapa1 = datosGuardados.etapa1 || this.etapa1;
        this.etapa2 = datosGuardados.etapa2 || this.etapa2;
        if (datosGuardados.listaRepeticionesEtapa3) {
          this.listaRepeticionesEtapa3 = datosGuardados.listaRepeticionesEtapa3;
        }
        this.etapa4 = datosGuardados.etapa4 || this.etapa4;
        this.etapa5 = datosGuardados.etapa5 || this.etapa5;
        this.etapa6 = datosGuardados.etapa6 || this.etapa6;
        this.etapa6 = datosGuardados.etapa6 || this.etapa6;
        this.etapa7 = datosGuardados.etapa7 || this.etapa7;
      } else {
        // Initialize default selection if no data loaded
        this.etapa7.formaCalculoAnalista = this.listaFormasCalculo.filter(f => f.seleccionado);
      }
    }
  }

  isFormaCalculoSelected(formaCalculo: any): boolean {
    if (!this.etapa7.formaCalculoAnalista) return false;
    return this.etapa7.formaCalculoAnalista.some((f: any) => f.id === formaCalculo.id);
  }

  toggleFormaCalculo(formaCalculo: any, event: any) {
    if (!this.etapa7.formaCalculoAnalista) {
      this.etapa7.formaCalculoAnalista = [];
    }

    const isChecked = event.detail.checked;

    if (isChecked) {
      // Add if not already present
      if (!this.isFormaCalculoSelected(formaCalculo)) {
        this.etapa7.formaCalculoAnalista.push(formaCalculo);
      }
    } else {
      // Remove if present
      this.etapa7.formaCalculoAnalista = this.etapa7.formaCalculoAnalista.filter(
        (f: any) => f.id !== formaCalculo.id
      );
    }
  }

  /**
   * Adjunta la firma de la coordinadora usando el servicio centralizado
   */
  async adjuntarFirma() {
    const firma = await this.imagenUploadService.seleccionarImagenBase64({
      maxSize: 2 * 1024 * 1024, // 2MB para firmas
      accept: 'image/png,image/jpeg,image/jpg',
      mostrarAlertas: true
    });

    if (firma) {
      this.etapa7.firmaCoordinador = firma;
      console.log('Firma adjuntada exitosamente');
    }
  }

  /**
   * Adjunta la imagen del manual de inocuidad usando el servicio centralizado
   */
  async adjuntarImagenManual() {
    const imagen = await this.imagenUploadService.seleccionarImagenBase64({
      maxSize: 5 * 1024 * 1024, // 5MB para imágenes de manual
      accept: 'image/png,image/jpeg,image/jpg',
      mostrarAlertas: true
    });

    if (imagen) {
      this.etapa5.imagenManual = imagen;
      console.log('Imagen del manual adjuntada exitosamente');
    }
  }

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

  openImagenPicker(event: any) {
    const element = event.target;
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
    const alert = await this.alertController.create({
      header: 'Cancelar',
      message: '¿Estás seguro de que deseas salir? Los cambios no guardados se perderán.',
      buttons: [
        {
          text: 'Continuar editando',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Salir',
          handler: () => {
            // Solo si estamos editando y cancelamos, volvemos a 'No realizado' o el estado previo lógico
            if (this.codigoALI && !this.formularioBloqueado) {
              this.ramService.updateEstadoRAM(parseInt(this.codigoALI), 'No realizado');
            }
            this.router.navigate(['/home']);
          }
        }
      ]
    });
    await alert.present();
  }

  async confirmarGuardarBorrador() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de guardar el borrador?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar clicked');
          }
        },
        {
          text: 'Guardar',
          handler: () => {
            console.log('--- GUARDANDO BORRADOR (Simulación) ---');

            const datosReporteRAM = {
              codigoALI: this.codigoALI,
              etapa1: this.etapa1,
              etapa2: this.etapa2,
              listaRepeticionesEtapa3: this.listaRepeticionesEtapa3,
              etapa4: this.etapa4,
              etapa5: this.etapa5,
              etapa6: this.etapa6,
              etapa7: this.etapa7
            };

            this.ultimaActtualizacionRam = new Date().toISOString();
            this.responsableModificacionRam = 'Usuario Actual'; // Esto debería venir de un servicio de auth

            if (this.codigoALI) {
              const id = parseInt(this.codigoALI);
              this.ramService.updateEstadoRAM(id, 'Borrador');
              this.ramService.updateInfoRAM(id, this.ultimaActtualizacionRam, this.responsableModificacionRam);
              this.ramService.updateDatosReporteRAM(id, datosReporteRAM);
            }
            this.router.navigate(['/home']);
          }
        }
      ]
    });
    await alert.present();
  }

  async confirmarFormulario() {
    console.log('Confirmar Formulario clicked');
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de confirmar el formulario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar clicked');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            console.log('--- CONFIRMANDO FORMULARIO (Simulación) ---');
            const datosReporteRAM = {
              codigoALI: this.codigoALI,
              etapa1: this.etapa1,
              etapa2: this.etapa2,
              listaRepeticionesEtapa3: this.listaRepeticionesEtapa3,
              etapa4: this.etapa4,
              etapa5: this.etapa5,
              etapa6: this.etapa6,
              etapa7: this.etapa7
            };

            this.ultimaActtualizacionRam = new Date().toISOString();
            this.responsableModificacionRam = 'Usuario Actual'; // Esto debería venir de un servicio de auth

            if (this.codigoALI) {
              const id = parseInt(this.codigoALI);
              this.ramService.updateEstadoRAM(id, 'Verificado');
              this.ramService.updateInfoRAM(id, this.ultimaActtualizacionRam, this.responsableModificacionRam);
              this.ramService.updateDatosReporteRAM(id, datosReporteRAM);
            }
            console.log(datosReporteRAM)
            this.router.navigate(['/home']);
          }
        }
      ]
    });
    await alert.present();
  }

  salirVerificado() {
    console.log('Salir clicked');
    this.navCtrl.back();
  }

}

