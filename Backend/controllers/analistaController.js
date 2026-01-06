const Analista = require('../models/analistaModel.js');

exports.crearAnalista = (req, res) => {
    const datos = req.body;

    // 1. Validar si el analista ya existe (Proactivo)
    Analista.obtenerPorRut(datos.rut_analista, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ mensaje: 'Error al crear el analista' });
        }

        if (result.rows && result.rows.length > 0) {
            return res.status(400).json({ mensaje: 'El RUT ya está registrado' });
        }
        // 2. Si no existe, crearlo
        Analista.crear(datos, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ mensaje: 'Error al crear el analista en la BD' });
            }

            res.status(201).json({
                mensaje: 'Analista creado exitosamente',
                filasAfectadas: result.rowsAffected
            });
        });
    });
};

exports.listarAnalistas = (req, res) => {
    Analista.obtenerAnalistas((err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ mensaje: 'Error al obtener analistas' });
        }
        res.status(200).json(result.rows);
    });
};


