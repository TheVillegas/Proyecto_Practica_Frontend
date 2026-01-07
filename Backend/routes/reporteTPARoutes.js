const express = require('express');
const router = express.Router();
const reporteTPAController = require('../controllers/reporteTPAController.js');

router.get('/:codigo_ali', reporteTPAController.obtenerReporteTPA);
router.get('/:codigo_ali/estado', reporteTPAController.obtenerEstadoReporte);
router.post('/', reporteTPAController.guardarReporteTPA);
router.put('/:codigo_ali/estado', reporteTPAController.actualizarEstadoReporte);
router.put('/:codigo_ali/verificar', reporteTPAController.verificarReporte);
module.exports = router;