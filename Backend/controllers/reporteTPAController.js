const ReporteTPA = require('../models/reporteTPAModel.js');

/**
 * Obtiene el reporte TPA completo por código ALI
 */
exports.obtenerReporteTPA = async (req, res) => {
    try {
        const { codigo_ali } = req.params;

        const reporte = await ReporteTPA.obtenerReporteTPA(codigo_ali);

        if (!reporte) {
            return res.status(404).json({ mensaje: 'Reporte TPA no encontrado' });
        }

        res.status(200).json(reporte);
    } catch (error) {
        console.error('Error al obtener reporte TPA:', error);
        res.status(500).json({ mensaje: 'Error al obtener el reporte TPA' });
    }
};

/**
 * Guarda o actualiza el reporte TPA completo
 */
exports.guardarReporteTPA = async (req, res) => {
    try {
        const datos = req.body;

        if (!datos.codigoALI) {
            return res.status(400).json({ mensaje: 'El código ALI es requerido' });
        }

        // Verificar que el reporte no esté en estado VERIFICADO
        const estadoActual = await ReporteTPA.obtenerEstadoReporte(datos.codigoALI);

        if (estadoActual === 'VERIFICADO') {
            return res.status(403).json({
                mensaje: 'No se puede modificar un reporte verificado'
            });
        }

        // Extraer rutUsuario del body para auditoría
        const rutUsuario = datos.rutUsuario || null;

        const result = await ReporteTPA.guardarReporteCompleto(datos, rutUsuario);

        res.status(200).json(result);
    } catch (error) {
        console.error('Error al guardar reporte TPA:', error);
        res.status(500).json({ mensaje: 'Error al guardar el reporte TPA' });
    }
};

/**
 * Actualiza el estado del reporte TPA
 */
exports.actualizarEstadoReporte = async (req, res) => {
    try {
        const { codigo_ali } = req.params;
        const { estado } = req.body;

        if (!estado) {
            return res.status(400).json({ mensaje: 'El estado es requerido' });
        }

        const result = await ReporteTPA.actualizarEstadoReporte(codigo_ali, estado);

        res.status(200).json({
            mensaje: 'Estado actualizado exitosamente',
            ...result
        });
    } catch (error) {
        console.error('Error al actualizar estado:', error);
        res.status(500).json({ mensaje: error.message || 'Error al actualizar el estado' });
    }
};

/**
 * Verifica el reporte TPA (marca como VERIFICADO)
 */
exports.verificarReporte = async (req, res) => {
    try {
        const { codigo_ali } = req.params;
        const { rut_usuario, observaciones_finales, firma } = req.body;

        if (!rut_usuario) {
            return res.status(400).json({ mensaje: 'El RUT del usuario es requerido' });
        }

        const result = await ReporteTPA.verificarReporte(
            codigo_ali,
            rut_usuario,
            observaciones_finales,
            firma
        );

        res.status(200).json({
            mensaje: 'Reporte verificado exitosamente',
            ...result
        });
    } catch (error) {
        console.error('Error al verificar reporte:', error);
        res.status(500).json({ mensaje: 'Error al verificar el reporte' });
    }
};

/**
 * Obtiene el estado actual del reporte
 */
exports.obtenerEstadoReporte = async (req, res) => {
    try {
        const { codigo_ali } = req.params;

        const estado = await ReporteTPA.obtenerEstadoReporte(codigo_ali);

        if (!estado) {
            return res.status(404).json({ mensaje: 'Reporte no encontrado' });
        }

        res.status(200).json({ estado });
    } catch (error) {
        console.error('Error al obtener estado:', error);
        res.status(500).json({ mensaje: 'Error al obtener el estado del reporte' });
    }
};
