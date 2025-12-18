import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AliService } from 'src/app/services/ali-service';
import { CatalogosService } from 'src/app/services/catalogos.service';
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
  ultimaActualizacion: string = '';
  responsableModificacion: string = 'Usuario Actual';
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
      equiposSeleccionados: [], // Changed from 'equipo' string
      lugarAlmacenamiento: "",
      tipoAccion: "", // 'Retiro' | 'Pesado'
      listaMateriales: [{ id: 0, tipoMaterial: "", codigoMaterial: "" }],
      observacionesEtapa2: ""
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
    private catalogosService: CatalogosService,
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
      this.ultimaActualizacion = this.aliService.getUltimaActualizacionTPA(id) || '';
      this.responsableModificacion = this.aliService.getResponsableTPA(id) || 'Usuario Actual';
    }
    this.opcionesMateriales = this.catalogosService.getMaterialesPesados();
    this.listaLugares = this.catalogosService.getLugaresAlmacenamiento();
    this.listaResponsables = this.catalogosService.getResponsables();
    this.listaEquipos = this.catalogosService.getEquiposInstrumentos();
    this.listaLimpieza = this.catalogosService.getChecklistLimpieza();
    this.opcionesMaterialSiembra = this.catalogosService.getMaterialSiembra();
    this.listaEquiposSiembra = this.catalogosService.getEquiposSiembra();
    this.opcionesDiluyentes = this.catalogosService.getDiluyentes();

    // Cargar datos guardados si existen
    if (this.codigoALI) {
      const datosGuardados = this.aliService.getDatosReporteTPA(parseInt(this.codigoALI));
      if (datosGuardados) {
        console.log('Cargando datos guardados...', datosGuardados);
        // Etapa 1
        this.lugarAlmacenamientoEtapa1 = datosGuardados.etapa1.lugarAlmacenamiento || '';
        this.observacionesEtapa1 = datosGuardados.etapa1.observaciones || '';

        // Etapa 2
        if (datosGuardados.etapa2_manipulacion && datosGuardados.etapa2_manipulacion.length > 0) {
          this.listaRepeticionesEtapa2 = datosGuardados.etapa2_manipulacion;
        }

        // Etapa 3 (Limpieza)
        if (datosGuardados.etapa3_limpieza && datosGuardados.etapa3_limpieza.checklist) {
          // Fusionar con la lista base para mantener IDs y nombres, pero actualizar seleccionados
          this.listaLimpieza.forEach(itemBase => {
            const itemGuardado = datosGuardados.etapa3_limpieza.checklist.find((i: any) => i.id === itemBase.id);
            if (itemGuardado) {
              itemBase.seleccionado = true;
            } else {
              // Si no está en lo guardado (y no es bloqueado por defecto), desmarcar
              if (!itemBase.bloqueado) itemBase.seleccionado = false;
            }
          });
        }

        // Etapa 4
        if (datosGuardados.etapa4_retiro && datosGuardados.etapa4_retiro.length > 0) {
          this.listaRepeticionesEtapa4 = datosGuardados.etapa4_retiro;
        }

        // Etapa 5
        if (datosGuardados.etapa5_siembra) {
          if (datosGuardados.etapa5_siembra.materiales && datosGuardados.etapa5_siembra.materiales.length > 0) {
            this.listaMaterialSiembra = datosGuardados.etapa5_siembra.materiales;
          }
          if (datosGuardados.etapa5_siembra.diluyentes && datosGuardados.etapa5_siembra.diluyentes.length > 0) {
            this.listaDiluyentes = datosGuardados.etapa5_siembra.diluyentes;
          }
          this.otrosEquiposSiembra = datosGuardados.etapa5_siembra.otrosEquipos || '';

          // Restaurar selección de equipos de siembra
          if (datosGuardados.etapa5_siembra.equipos) {
            this.listaEquiposSiembra.forEach(eq => {
              const savedEq = datosGuardados.etapa5_siembra.equipos.find((s: any) => s.id === eq.id);
              if (savedEq) eq.seleccionado = true;
              else eq.seleccionado = false;
            });
          }
        }

        // Etapa 6
        /*
        if (datosGuardados.etapa6_cierre) {
          this.observacionesFinales = datosGuardados.etapa6_cierre.observaciones || '';
          // La firma es más compleja de restaurar si es base64, asumimos que string base64 se guarda
          if (datosGuardados.etapa6_cierre.firma && datosGuardados.etapa6_cierre.firma !== 'Sin firma' && datosGuardados.etapa6_cierre.firma !== 'Firma presente') {
            this.firmaCoordinador = datosGuardados.etapa6_cierre.firma;
          }
        }
        */
      }
    }
  }

  cambiarEstado(event: any) {
    this.estadoSeleccionado = event.detail.value || '';
    console.log(this.estadoSeleccionado);
  }
  //Repeticion Etapa 2
  agregarRepeticion() {
    // const nuevoID = this.listaRepeticionesEtapa2.length + 1; // ID timestamp es mejor para no duplicar
    const nuevoItem = {
      id: Date.now(),
      responsable: "",
      fechaPreparacion: new Date().toISOString(),
      horaPesado: new Date().toISOString(),
      numeroMuestras: null,
      equiposSeleccionados: [],
      lugarAlmacenamiento: "",
      tipoAccion: "",
      listaMateriales: [
        { id: Date.now(), tipoMaterial: '', codigoMaterial: '' }
      ],
      observacionesEtapa2: ""
    };
    this.listaRepeticionesEtapa2.push(nuevoItem);

    // Opcional: solo si quieres auto-abrir el acordeón
    console.log(this.listaRepeticionesEtapa2);
    const nuevoIndice = this.listaRepeticionesEtapa2.length - 1;
    const nombreNuevoAnalista = 'etapa2' + nuevoIndice;
    this.seccionActual = nombreNuevoAnalista;
  }
  esEquipoSeleccionado(etapaIndex: number, equipoNombre: string): boolean {
    return this.listaRepeticionesEtapa2[etapaIndex].equiposSeleccionados.includes(equipoNombre);
  }

  toggleEquipo(etapaIndex: number, equipoNombre: string) {
    const etapa = this.listaRepeticionesEtapa2[etapaIndex];
    const index = etapa.equiposSeleccionados.indexOf(equipoNombre);
    if (index > -1) {
      etapa.equiposSeleccionados.splice(index, 1);
    } else {
      etapa.equiposSeleccionados.push(equipoNombre);
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
            this.router.navigate(['/home']);
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

            const limpiezaFiltrada = this.listaLimpieza.filter(l => l.seleccionado);
            const equiposSiembraFiltrados = this.listaEquiposSiembra.filter(e => e.seleccionado);
            const diluyentesFiltrados = this.listaDiluyentes.filter(d => d.nombre && d.nombre !== '');

            console.log('Datos:', {
              etapa2: this.listaRepeticionesEtapa2,
              etapa4: this.listaRepeticionesEtapa4,
              siembra: this.listaMaterialSiembra,
              diluyentes: diluyentesFiltrados,
              firma: this.firmaCoordinador ? 'Firma presente' : 'Sin firma'
            });
            // Construir objeto de datos para guardar
            const datosParaGuardar = {
              codigoALI: this.codigoALI,
              etapa1: {
                lugarAlmacenamiento: this.lugarAlmacenamientoEtapa1,
                observaciones: this.observacionesEtapa1
              },
              etapa2_manipulacion: this.listaRepeticionesEtapa2,
              etapa3_limpieza: {
                checklist: limpiezaFiltrada,
              },
              etapa4_retiro: this.listaRepeticionesEtapa4,
              etapa5_siembra: {
                materiales: this.listaMaterialSiembra, // Guardamos todos para poder editar, no solo filtrados
                equipos: equiposSiembraFiltrados,
                otrosEquipos: this.otrosEquiposSiembra,
                diluyentes: this.listaDiluyentes // Guardamos todos
              },
              etapa6_cierre: {
                firma: this.firmaCoordinador, // Guardamos la firma real (Base64)
                observaciones: this.observacionesFinales
              }
            };

            this.estadoTPA = 'Borrador';
            this.ultimaActualizacion = new Date().toISOString();
            // Actualizar en el servicio para sincronización global
            if (this.codigoALI) {
              const id = parseInt(this.codigoALI);
              this.aliService.updateEstadoTPA(id, 'Borrador');
              this.aliService.updateInfoTPA(id, this.ultimaActualizacion, this.responsableModificacion);
              this.aliService.updateDatosReporteTPA(id, datosParaGuardar);
            }
            this.router.navigate(['/home']);
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

            // Filtrado de datos
            const limpiezaFiltrada = this.listaLimpieza.filter(l => l.seleccionado);
            const equiposSiembraFiltrados = this.listaEquiposSiembra.filter(e => e.seleccionado);
            const diluyentesFiltrados = this.listaDiluyentes.filter(d => d.nombre && d.nombre !== '');
            const materialesSiembraFiltrados = this.listaMaterialSiembra.filter(m => m.nombre && m.nombre !== '');

            // Construcción del objeto completo para Backend
            const reporteCompleto = {
              codigoALI: this.codigoALI,
              estado: 'Verificado',
              etapa1: {
                lugarAlmacenamiento: this.lugarAlmacenamientoEtapa1,
                observaciones: this.observacionesEtapa1
              },
              etapa2_manipulacion: this.listaRepeticionesEtapa2, // Ya contiene equiposSeleccionados
              etapa3_limpieza: {
                checklist: limpiezaFiltrada,
              },
              etapa4_retiro: this.listaRepeticionesEtapa4,
              etapa5_siembra: {
                materiales: materialesSiembraFiltrados,
                equipos: equiposSiembraFiltrados,
                otrosEquipos: this.otrosEquiposSiembra,
                diluyentes: diluyentesFiltrados
              },
              etapa6_cierre: {
                firma: this.firmaCoordinador ? 'Firma presente' : 'Sin firma', // O la base64 real
                observaciones: this.observacionesFinales
              }
            };

            // Objeto con firma real para persistencia interna
            const datosPersistentes = { ...reporteCompleto };
            //datosPersistentes.etapa6_cierre.firma = this.firmaCoordinador; Error por tipo de dato del campo firma
            datosPersistentes.etapa5_siembra.materiales = this.listaMaterialSiembra; // Guardar completos por si se desbloquea
            datosPersistentes.etapa5_siembra.diluyentes = this.listaDiluyentes;
            console.log('DATOS PARA BACKEND (FILTRADOS):', reporteCompleto);

            // Aquí iría la lógica real de guardado final
            this.formularioBloqueado = true;
            this.estadoTPA = 'Verificado';
            this.ultimaActualizacion = new Date().toISOString();
            // Actualizar en el servicio para sincronización global
            if (this.codigoALI) {
              const id = parseInt(this.codigoALI);
              this.aliService.updateEstadoTPA(id, 'Verificado');
              this.aliService.updateInfoTPA(id, this.ultimaActualizacion, this.responsableModificacion);
              this.aliService.updateDatosReporteTPA(id, datosPersistentes);
            }
            this.router.navigate(['/home']);
          }
        }
      ]
    });
    await alert.present();
  }
}
