export interface ALI {
    ALIMuestra: number;
    CodigoSerna: number;

    estadoTPA: 'Verificado' | 'Borrador' | 'No realizado';
    estadoRAM: 'Verificado' | 'Borrador' | 'No realizado';

    ultimaActualizacionTPA?: string;
    responsableTPA?: string;
    ultimaActualizacionRAM?: string;
    responsableRAM?: string;
    datosReporteTPA?: any;
    //Aca irian los demas estados de los reportes proximamentes digitalizados
}
