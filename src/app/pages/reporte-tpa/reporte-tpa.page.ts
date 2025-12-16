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
  etapaActual: string = 'etapa1';
  opcionesMateriales: any[] = [];
  listaLugares: any[] = [];
  listaResponsables: any[] = [];
  listaEquipos: any[] = [];
  opcionesMaterialSiembra: any[] = [];
  listaEquiposSiembra: any[] = [];
  opcionesDiluyentes: any[] = [];
  firmaCoordinador: string | null = null;
  observaciones: string = '';

  constructor(private route: ActivatedRoute, private aliService: AliService) { }

  ngOnInit() {
    this.codigoALI = this.route.snapshot.paramMap.get('codigoALI')!;
    if (this.codigoALI) {
      this.estadoTPA = this.aliService.getEstadoTPA(parseInt(this.codigoALI));
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
    const nuevoIndice = this.listaRepeticionesEtapa2.length - 1;
    const nombreNuevoAnalista = 'etapa2' + nuevoIndice;
    this.seccionActual = nombreNuevoAnalista;
    this.agregarMaterial(nuevoIndice);
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
}
