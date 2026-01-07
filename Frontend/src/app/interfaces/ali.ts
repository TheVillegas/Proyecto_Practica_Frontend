import { ReporteRAM } from './reporte-ram.interface';
import { ReporteTPA } from './reporte-tpa.interface';

export interface ImagenObservacion {
    nombre: string;
    tipo: string;
    tamanio: number;
    data: string; // Base64 string
    fechaAdjunto: string;
}

export interface ALI {
    ALIMuestra: number;
    CodigoSerna: number;
    observacionesCliente: string;
    observacionesGenerales: string;
    imagenesObservaciones?: ImagenObservacion[]; // Array opcional de imágenes adjuntas

    reporteTPA: ReporteTPA;
    reporteRAM: ReporteRAM;

    //Aca irian los demas estados de los reportes proximamentes digitalizados
}
