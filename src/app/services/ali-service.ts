import { Injectable } from '@angular/core';
import { ALI } from '../interfaces/ali';

@Injectable({
  providedIn: 'root',
})
export class AliService {

  muestraALI: ALI[] = [
    { ALIMuestra: 1, CodigoSerna: 123456, estadoTPA: 'Verificado', estadoRAM: 'No realizado' },
    { ALIMuestra: 2, CodigoSerna: 654321, estadoTPA: 'Borrador', estadoRAM: 'Borrador' },
    { ALIMuestra: 3, CodigoSerna: 111111, estadoTPA: 'No realizado', estadoRAM: 'Borrador' },
    { ALIMuestra: 1432, CodigoSerna: 2222, estadoTPA: 'Borrador', estadoRAM: 'Verificado' },
    { ALIMuestra: 1111, CodigoSerna: 292929, estadoTPA: 'No realizado', estadoRAM: 'Verificado' }
  ];

  constructor() { }

  getMuestras(): ALI[] {
    return this.muestraALI;
  }

  getMuestraPorID(id: number): ALI {
    return this.muestraALI.find(muestraALI => muestraALI.ALIMuestra == id)!;
  }

  getEstadoTPA(id: number): string {
    return this.muestraALI.find(m => m.ALIMuestra == id)?.estadoTPA!;
  }

  getEstadoRAM(id: number): string {
    return this.muestraALI.find(m => m.ALIMuestra == id)?.estadoRAM!;
  }


  getMaterialesPesados(): any[] {
    return [
      { nombre: '--- INSTRUMENTOS ---', valor: '', esTitulo: true },
      { nombre: 'Cuchara', valor: 'cuchara', esTitulo: false },
      { nombre: 'Bisturí', valor: 'bisturi', esTitulo: false },
      { nombre: 'Pinzas', valor: 'pinzas', esTitulo: false },
      { nombre: '--- PIPETAS 1 ML ---', valor: '', esTitulo: true },
      { nombre: '\u00A0\u00A0 Pipeta 22-M', valor: '22-M', esTitulo: false },
      { nombre: '\u00A0\u00A0 Pipeta 23-M', valor: '23-M', esTitulo: false },
      { nombre: '\u00A0\u00A0 Pipeta 72-M', valor: '72-M', esTitulo: false },
      { nombre: '\u00A0\u00A0 Pipeta 98-M', valor: '98-M', esTitulo: false },
      { nombre: '\u00A0\u00A0 Pipeta 100-M', valor: '100-M', esTitulo: false },
      { nombre: '\u00A0\u00A0 Pipeta 102-M', valor: '102-M', esTitulo: false },
      { nombre: '--- PIPETAS 10 ML ---', valor: '', esTitulo: true },
      { nombre: '\u00A0\u00A0 Pipeta 32-M', valor: '32-M', esTitulo: false },
      { nombre: '\u00A0\u00A0 Pipeta 75-M', valor: '75-M', esTitulo: false },
      { nombre: '\u00A0\u00A0 Pipeta 94-M', valor: '94-M', esTitulo: false },
      { nombre: '\u00A0\u00A0 Pipeta 103-M', valor: '103-M', esTitulo: false },
      { nombre: '\u00A0\u00A0 Pipeta 106-M', valor: '106-M', esTitulo: false },
    ];
  }
  getLugaresAlmacenamiento() {
    return [
      { id: 1, nombre: 'Freezer 33-M' },
      { id: 2, nombre: 'Refrigerador 33-M' },
      { id: 3, nombre: 'Mesón Siembra' },
      { id: 4, nombre: 'Gabinete sala Transpaso' }
    ];
  }

  getResponsables() {
    return [
      { id: 1, nombre: 'Olaya' },
      { id: 2, nombre: 'Jorge' },
      { id: 3, nombre: 'Sandy' },
      { id: 4, nombre: 'Pricilla' },
      { id: 5, nombre: 'Matias' }
    ];
  }

  getEquiposInstrumentos() {
    return [
      { id: 1, nombre: 'Balanza 74-M' },
      { id: 2, nombre: 'Camara Flujo laminar 8-M' },
      { id: 3, nombre: 'Balanza 6-M' },
      { id: 4, nombre: 'Meson de Transpaso' },
      { id: 5, nombre: 'Balanza 99-M' },
      { id: 6, nombre: 'Balanza 108-M' }
    ];
  }

  getChecklistLimpieza() {
    return [
      { id: 1, nombre: 'Mesón', seleccionado: true, bloqueado: true },
      { id: 2, nombre: 'Stomacher 12-M', seleccionado: false, bloqueado: false },
      { id: 3, nombre: 'Cámara Flujo laminar 8-M', seleccionado: false, bloqueado: false },
      { id: 4, nombre: 'Balanza 74-M/108-M', seleccionado: false, bloqueado: false },
      { id: 5, nombre: 'Balanza 6-M/99-M', seleccionado: false, bloqueado: false },
      { id: 6, nombre: 'Gabinete', seleccionado: false, bloqueado: false },
      { id: 7, nombre: 'Desinfectante en aerosol', seleccionado: true, bloqueado: true }
    ];
  }
}
