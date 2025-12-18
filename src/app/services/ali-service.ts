import { Injectable } from '@angular/core';
import { ALI } from '../interfaces/ali';

@Injectable({
  providedIn: 'root',
})
export class AliService {

  muestraALI: ALI[] = [
    {
      ALIMuestra: 1, CodigoSerna: 123456,
      reporteTPA: { estado: 'Verificado', datosReporte: undefined },
      reporteRAM: { estado: 'No realizado', datosReporte: undefined }
    },
    {
      ALIMuestra: 2, CodigoSerna: 654321,
      reporteTPA: { estado: 'Borrador', datosReporte: undefined },
      reporteRAM: { estado: 'Borrador', datosReporte: undefined }
    },
    {
      ALIMuestra: 3, CodigoSerna: 111111,
      reporteTPA: { estado: 'No realizado', datosReporte: undefined },
      reporteRAM: { estado: 'Borrador', datosReporte: undefined }
    },
  ];

  constructor() { }

  getMuestras(): ALI[] {
    return this.muestraALI;
  }


  getMuestraPorID(id: number): ALI {
    return this.muestraALI.find(muestraALI => muestraALI.ALIMuestra == id)!;
  }

  getEstadoTPA(id: number): string {
    return this.muestraALI.find(m => m.ALIMuestra == id)?.reporteTPA.estado!;
  }

  getEstadoRAM(id: number): string {
    return this.muestraALI.find(m => m.ALIMuestra == id)?.reporteRAM.estado!;
  }

  updateEstadoTPA(id: number, nuevoEstado: 'Verificado' | 'Borrador' | 'No realizado') {
    const muestra = this.muestraALI.find(m => m.ALIMuestra == id);
    if (muestra) {
      muestra.reporteTPA.estado = nuevoEstado;
    }
  }

  getUltimaActualizacionTPA(id: number): string | undefined {
    return this.muestraALI.find(m => m.ALIMuestra == id)?.reporteTPA.ultimaActualizacion;
  }

  getResponsableTPA(id: number): string | undefined {
    return this.muestraALI.find(m => m.ALIMuestra == id)?.reporteTPA.responsable;
  }

  updateInfoTPA(id: number, fecha: string, responsable: string) {
    const muestra = this.muestraALI.find(m => m.ALIMuestra == id);
    if (muestra) {
      muestra.reporteTPA.ultimaActualizacion = fecha;
      muestra.reporteTPA.responsable = responsable;
    }
  }

  updateDatosReporteTPA(id: number, datos: any) {
    const muestra = this.muestraALI.find(m => m.ALIMuestra == id);
    if (muestra) {
      muestra.reporteTPA.datosReporte = datos;
    }
  }

  getDatosReporteTPA(id: number): any {
    return this.muestraALI.find(m => m.ALIMuestra == id)?.reporteTPA.datosReporte;
  }

  agregarMuestraALI(id: number, codigoSerna: number) {

    const nuevaMuestra: ALI = {
      ALIMuestra: id, CodigoSerna: codigoSerna,
      reporteTPA: { estado: 'No realizado' },
      reporteRAM: { estado: 'No realizado' }
    }
    this.muestraALI.push(nuevaMuestra);
  }


}
