import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AliService } from 'src/app/services/ali-service';
import { IonContent, NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

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
  // --- ETAPA 1 ---
  lugarAlmacenamientoEtapa1: string = '';
  observacionesEtapa1: string = '';

  // --- ETAPA 2 (Lista Dinámica) ---
  listaRepeticionesEtapa2: any[] = [
    {
      id: 0,
      responsable: "",
      fechaPreparacion: new Date().toISOString(),
      horaInicio: new Date().toISOString(),
      horaPesado: new Date().toISOString(),
      numeroMuestras: null,
      equipo: "",
      lugarAlmacenamiento: "",
      tipoAccion: "", // 'Retiro' | 'Pesado'
      listaMateriales: [{ id: 0, tipoMaterial: "", codigoMaterial: "" }]
    }
  ];
  listaRepeticionesEtapa4: any[] = [
    { id: 0, responsable: "", fecha: new Date().toISOString(), horaInicio: new Date().toISOString(), analisisARealizar: "" }
  ];
  listaMaterialSiembra: any[] = [
    { id: 0, nombre: "", codigoMaterialSiembra: "" }
  ];
  listaDiluyentes: any[] = [
    { id: 0, nombre: "", codigoDiluyente: "" }
  ];




  listaLimpieza: any[] = [];
  observacionesLimpieza: string = ''; // Etapa 3

  opcionesMateriales: any[] = [];
  listaLugares: any[] = [];
  listaResponsables: any[] = [];
  listaEquipos: any[] = [];
  opcionesMaterialSiembra: any[] = [];
  listaEquiposSiembra: any[] = [];
  otrosEquiposSiembra: string = ''; // Etapa 5
  opcionesDiluyentes: any[] = [];
  firmaCoordinador: string | null = null;
  observacionesFinales: string = ''; // Etapa 6
  formularioBloqueado: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private aliService: AliService,
    private navCtrl: NavController,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.codigoALI = this.route.snapshot.paramMap.get('codigoALI')!;
    if (this.codigoALI) {
      const id = parseInt(this.codigoALI);
      this.estadoTPA = this.aliService.getEstadoTPA(id);

      // Regla de Negocio: Si estadoTPA es 'Verificado', bloquear inmediatamente
      if (this.estadoTPA === 'Verificado') {
        this.formularioBloqueado = true;
      } else {
        this.formularioBloqueado = false;
      }
    }
    this.opcionesMateriales = this.aliService.getMaterialesPesados();
    this.listaLugares = this.aliService.getLugaresAlmacenamiento();
    this.listaResponsables = this.aliService.getResponsables();
    this.listaEquipos = this.aliService.getEquiposInstrumentos();
    this.listaLimpieza = this.aliService.getChecklistLimpieza();
    this.opcionesMaterialSiembra = this.aliService.getMaterialSiembra();
    this.listaEquiposSiembra = this.aliService.getEquiposSiembra();
    this.opcionesDiluyentes = this.aliService.getDiluyentes();
  }

  cambiarEstado(event: any) {
    this.estadoSeleccionado = event.detail.value || '';
    console.log(this.estadoSeleccionado);
  }

  agregarRepeticion() {
    // const nuevoID = this.listaRepeticionesEtapa2.length + 1; // ID timestamp es mejor para no duplicar
    const nuevoItem = {
      id: Date.now(),
      responsable: "",
      fechaPreparacion: new Date().toISOString(),
      horaInicio: new Date().toISOString(),
      horaPesado: new Date().toISOString(),
      numeroMuestras: null,
      equipo: "",
      lugarAlmacenamiento: "",
      tipoAccion: "",
      listaMateriales: [
        { id: Date.now(), tipoMaterial: '', codigoMaterial: '' }
      ]
    };
    this.listaRepeticionesEtapa2.push(nuevoItem);

    console.log(this.listaRepeticionesEtapa2);
    // const nuevoIndice = this.listaRepeticionesEtapa2.length - 1;
    // const nombreNuevoAnalista = 'etapa2' + nuevoIndice;
    // this.seccionActual = nombreNuevoAnalista; // Opcional: solo si quieres auto-abrir el acordeón
  }
  agregarRepeticionEtapa4() {
    const nuevoID = this.listaRepeticionesEtapa4.length + 1;
    this.listaRepeticionesEtapa4.push({
      id: nuevoID,
      responsable: '',
      fecha: new Date().toISOString(),
      horaInicio: new Date().toISOString(),
      analisisARealizar: ''
    })
    console.log(this.listaRepeticionesEtapa4);
    const nuevoIndice = this.listaRepeticionesEtapa4.length - 1;
    const nombreNuevoAnalista = 'etapa4' + nuevoIndice;
    this.seccionActual = nombreNuevoAnalista;
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

  agregarLimpieza(instrumento: string) {
    this.listaLimpieza.push(instrumento);
    console.log(this.listaLimpieza);
  }

  agregarMaterialSiembra() {
    const nuevoID = this.listaMaterialSiembra.length + 1;
    this.listaMaterialSiembra.push({
      id: nuevoID,
      nombre: '',
      codigoMaterialSiembra: ''
    });
    console.log(this.listaMaterialSiembra);
  }

  agregarDiluyente() {
    const nuevoID = this.listaDiluyentes.length + 1;
    this.listaDiluyentes.push({
      id: nuevoID,
      nombre: '',
      codigoDiluyente: ''
    });
  }

  cargarFirmaCoordinador(event: any) {
    const archivo = event.target.files[0];

    if (archivo) {
      if (!archivo.type.startsWith('image/')) {
        console.error('Por favor suba una imagen');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        // Guardamos el string Base64 en la variable
        this.firmaCoordinador = reader.result as string;
      };
      reader.readAsDataURL(archivo);
    }
  }

  // --- Lógica de la Barra de Acciones ---

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
            this.navCtrl.back();
            // Solo si estamos editando y cancelamos, volvemos a 'No realizado' o el estado previo lógico
            if (this.codigoALI && !this.formularioBloqueado) {
              this.aliService.updateEstadoTPA(parseInt(this.codigoALI), 'No realizado');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  salirVerificado() {
    // Salida segura para modo solo lectura/verificado
    this.navCtrl.back();
  }

  async confirmarGuardarBorrador() {
    const alert = await this.alertController.create({
      header: 'Guardar Borrador',
      message: '¿Estás seguro de guardar el borrador? Podrás seguir editando después.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Guardar',
          handler: () => {
            console.log('--- GUARDANDO BORRADOR (Simulación) ---');
            console.log('Datos:', {
              etapa2: this.listaRepeticionesEtapa2,
              etapa4: this.listaRepeticionesEtapa4,
              siembra: this.listaMaterialSiembra,
              diluyentes: this.listaDiluyentes,
              firma: this.firmaCoordinador ? 'Firma presente' : 'Sin firma'
            });
            this.estadoTPA = 'Borrador';
            // Actualizar en el servicio para sincronización global
            if (this.codigoALI) {
              this.aliService.updateEstadoTPA(parseInt(this.codigoALI), 'Borrador');
            }
            // No bloqueamos el formulario
          }
        }
      ]
    });
    await alert.present();
  }

  async confirmarFormulario() {
    const alert = await this.alertController.create({
      header: 'Confirmar Formulario',
      message: '¿Estás seguro de confirmar? El formulario quedará BLOQUEADO y no podrás editar nada más.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Confirmar y Bloquear',
          handler: () => {
            console.log('--- CONFIRMANDO FORMULARIO (Simulación) ---');

            // Construcción del objeto completo para Backend
            const reporteCompleto = {
              codigoALI: this.codigoALI,
              estado: 'Verificado',
              etapa1: {
                lugarAlmacenamiento: this.lugarAlmacenamientoEtapa1,
                observaciones: this.observacionesEtapa1
              },
              etapa2_manipulacion: this.listaRepeticionesEtapa2,
              etapa3_limpieza: {
                checklist: this.listaLimpieza,
                observaciones: this.observacionesLimpieza
              },
              etapa4_retiro: this.listaRepeticionesEtapa4,
              etapa5_siembra: {
                materiales: this.listaMaterialSiembra,
                equipos: this.listaEquiposSiembra,
                otrosEquipos: this.otrosEquiposSiembra,
                diluyentes: this.listaDiluyentes
              },
              etapa6_cierre: {
                firma: this.firmaCoordinador ? 'Firma presente' : 'Sin firma', // O la base64 real
                observaciones: this.observacionesFinales
              }
            };

            console.log('DATOS PARA BACKEND:', reporteCompleto);

            // Aquí iría la lógica real de guardado final
            this.formularioBloqueado = true;
            this.estadoTPA = 'Verificado';
            // Actualizar en el servicio para sincronización global
            if (this.codigoALI) {
              this.aliService.updateEstadoTPA(parseInt(this.codigoALI), 'Verificado');
            }
            // this.router.navigate(['/home']); // REMOVIDO por solicitud: "No llames a servicios ni lógica compleja"
          }
        }
      ]
    });
    await alert.present();
  }
}
