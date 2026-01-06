const express = require('express');
const router = express.Router();
const analistaController = require('../controllers/analistaController.js');

router.post('/analista', analistaController.crearAnalista);
router.get('/analistas', analistaController.listarAnalistas);


module.exports = router;