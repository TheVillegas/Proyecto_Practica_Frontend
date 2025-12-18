import { Injectable } from '@angular/core';
import { ReporteRAM } from '../interfaces/reporte-ram.interface';
import { AliService } from './ali-service';

@Injectable({
  providedIn: 'root',
})
export class RamService {

  constructor(private aliService: AliService) { }

  updateEstadoRAM(id: number, nuevoEstado: 'Verificado' | 'Borrador' | 'No realizado') {
    const muestra = this.aliService.getMuestraPorID(id);
    if (muestra) {
      muestra.reporteRAM.estado = nuevoEstado;
    }
  }

  // Faltaria Incluirla en el servicio debido a que estamos devolviendo un string 

  getUltimaActualizacionRAM(id: number): string | undefined {
    const muestra = this.aliService.getMuestraPorID(id);
    if (muestra) {
      return muestra.reporteRAM.ultimaActualizacion;
    }
    return '';
  }

  getResponsableRAM(id: number): string | undefined {
    const muestra = this.aliService.getMuestraPorID(id);
    if (muestra) {
      return muestra.reporteRAM.responsable;
    }
    return '';
  }

  updateInfoRAM(id: number, fecha: string, responsable: string) {
    const muestra = this.aliService.getMuestraPorID(id);
    if (muestra) {
      muestra.reporteRAM.ultimaActualizacion = fecha;
      muestra.reporteRAM.responsable = responsable;
    }
  }

  updateDatosReporteRAM(id: number, datos: any) {
    const muestra = this.aliService.getMuestraPorID(id);
    if (muestra) {
      muestra.reporteRAM.datosReporte = datos;
    }
  }

  getDatosReporteRAM(id: number): any | undefined {
    const muestra = this.aliService.getMuestraPorID(id);
    if (muestra) {
      return muestra.reporteRAM.datosReporte;
    }
    return undefined;
  }


}
