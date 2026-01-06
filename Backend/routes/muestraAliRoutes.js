const express = require('express');
const router = express.Router();
const muestraAliController = require('../controllers/muestraAliController.js');

// Rutas para Muestras ALI
router.post('/crearMuestra', muestraAliController.crearMuestraALI);
router.get('/obtenerMuestras', muestraAliController.listarMuestrasALI);
router.get('/:codigo_ali', muestraAliController.obtenerMuestraALI_porCodigoAli);
router.put('/observaciones', muestraAliController.actualizarObservacionesGenerales);
router.delete('/:codigo_ali', muestraAliController.eliminarMuestraALI);


module.exports = router;
