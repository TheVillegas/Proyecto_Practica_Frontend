import { ReporteRAM } from './reporte-ram.interface';
import { ReporteTPA } from './reporte-tpa.interface';

export interface ALI {
    ALIMuestra: number;
    CodigoSerna: number;

    reporteTPA: ReporteTPA;
    reporteRAM: ReporteRAM;

    //Aca irian los demas estados de los reportes proximamentes digitalizados
}
