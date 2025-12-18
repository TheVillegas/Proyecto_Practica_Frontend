import { Injectable } from '@angular/core';


//clase hecha en angular no con ionic
@Injectable({
    providedIn: 'root',
})
export class CatalogosService {

    constructor() { }

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
            { id: 4, nombre: 'Priscila' },
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

    getMaterialSiembra() {
        return [
            { id: 1, nombre: 'Puntas 1 ML' },
            { id: 2, nombre: 'Puntas 10ML' },
            { id: 3, nombre: 'Placas estériles 57cm2/150mm' },
            { id: 4, nombre: 'Asas Drigalsky' },
            { id: 5, nombre: 'Blender' },
            { id: 6, nombre: 'Bolsas estériles' },
            { id: 7, nombre: 'Probeta 250 ML' },
            { id: 8, nombre: 'Probeta 100 ML' }
        ];
    }

    getEquiposSiembra() {
        return [
            { id: 1, nombre: 'Baño-5m', seleccionado: false },
            { id: 2, nombre: 'Homogenizador 12-m', seleccionado: false },
            { id: 3, nombre: 'Cuenta colonias 9-M', seleccionado: false },
            { id: 4, nombre: 'Cuenta Colonias 101-m', seleccionado: false },
            { id: 5, nombre: 'pHmetro 93-m', seleccionado: false },
            { id: 6, nombre: 'pipetas desechables', seleccionado: false },
        ];
    }

    getDiluyentes() {
        return [
            { id: 1, nombre: 'AP 0,1 90ml' },
            { id: 2, nombre: 'AP 0,1 99ml' },
            { id: 3, nombre: 'AP 0,1 450ml' },
            { id: 4, nombre: 'AP 0,1 225ml' },
            { id: 5, nombre: 'AP 0,1 500ml' },
            { id: 6, nombre: 'AP 0,1 tubosml' },
            { id: 7, nombre: 'PBS 450 ml' },
            { id: 8, nombre: 'SPS 225 ml' },
            { id: 9, nombre: 'SPS Tubos' },
            { id: 10, nombre: 'SPS sa 90ml' },
            { id: 11, nombre: 'SPS sa tubos' }
        ];
    }

    getEquiposIncubacion() {
        return [
            { id: 1, nombre: 'Estufa 73-M (35+/-0,5C)' },
            { id: 2, nombre: 'Estufa 2-M(35.5+/-0,5C)' }
        ]
    }
    getMicroPipetas() {
        return [
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
        ]
    }
}
