const express = require('express');
const router = express.Router();
const reporteTPAController = require('../controllers/reporteTPAController.js');

/**
 * @route GET /api/reporte-tpa/:codigo_ali
 * @desc Obtiene el reporte TPA completo por código ALI
 */
router.get('/:codigo_ali', reporteTPAController.obtenerReporteTPA);

/**
 * @route GET /api/reporte-tpa/:codigo_ali/estado
 * @desc Obtiene el estado actual del reporte TPA
 */
router.get('/:codigo_ali/estado', reporteTPAController.obtenerEstadoReporte);

/**
 * @route POST /api/reporte-tpa
 * @desc Guarda o actualiza el reporte TPA completo
 * @body { codigoALI, estado, etapa1, etapa2_manipulacion, etapa3_limpieza, etapa4_retiro, etapa5_siembra, etapa6_cierre }
 */
router.post('/', reporteTPAController.guardarReporteTPA);

/**
 * @route PUT /api/reporte-tpa/:codigo_ali/estado
 * @desc Actualiza el estado del reporte (NO_REALIZADO, BORRADOR, VERIFICADO)
 * @body { estado }
 */
router.put('/:codigo_ali/estado', reporteTPAController.actualizarEstadoReporte);

/**
 * @route PUT /api/reporte-tpa/:codigo_ali/verificar
 * @desc Verifica el reporte (marca como VERIFICADO y registra cierre)
 * @body { rut_usuario, observaciones_finales, firma }
 */
router.put('/:codigo_ali/verificar', reporteTPAController.verificarReporte);

module.exports = router;