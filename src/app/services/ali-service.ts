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


}
