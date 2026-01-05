export interface ReporteRAM {
    estado: 'Verificado' | 'Borrador' | 'No realizado';
    ultimaActualizacion?: string;
    responsable?: string;
    datosReporte?: any;
}
