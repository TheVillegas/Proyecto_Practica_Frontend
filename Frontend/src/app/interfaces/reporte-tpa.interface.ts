export interface ReporteTPA {
    estado: 'Verificado' | 'Borrador' | 'No realizado';
    ultimaActualizacion?: string;
    responsable?: string;
    datosReporte?: any;
}
