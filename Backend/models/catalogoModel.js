const db = require('../config/DB.js');

const Catalogo = {};

// --- 1. LUGARES ALMACENAMIENTO ---
Catalogo.obtenerLugaresAlmacenamiento = (callback) => {
    const sql = 'SELECT * FROM LUGARES_ALMACENAMIENTO';
    db.execute(sql)
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

Catalogo.obtenerLugarAlmacenamiento_porID = (id, callback) => {
    const sql = 'SELECT * FROM LUGARES_ALMACENAMIENTO WHERE id_lugar = :id';
    db.execute(sql, { id })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

Catalogo.crearLugarAlmacenamiento = (datos, callback) => {
    const { nombre_lugar, codigo_lugar } = datos;
    const sql = 'INSERT INTO LUGARES_ALMACENAMIENTO (nombre_lugar, codigo_lugar) VALUES (:nombre_lugar, :codigo_lugar)';
    db.execute(sql, { nombre_lugar, codigo_lugar }, { autoCommit: true })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

Catalogo.actualizarLugarAlmacenamiento = (id, datos, callback) => {
    const { nombre_lugar, codigo_lugar } = datos;
    const sql = 'UPDATE LUGARES_ALMACENAMIENTO SET nombre_lugar = :nombre_lugar, codigo_lugar = :codigo_lugar WHERE id_lugar = :id';
    db.execute(sql, { nombre_lugar, codigo_lugar, id }, { autoCommit: true })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

Catalogo.eliminarLugarAlmacenamiento = (id, callback) => {
    const sql = 'DELETE FROM LUGARES_ALMACENAMIENTO WHERE id_lugar = :id';
    db.execute(sql, { id }, { autoCommit: true })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

// --- 2. INSTRUMENTOS ---
Catalogo.obtenerInstrumentos = (callback) => {
    const sql = 'SELECT * FROM INSTRUMENTOS';
    db.execute(sql)
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

Catalogo.obtenerInstrumento_porID = (id, callback) => {
    const sql = 'SELECT * FROM INSTRUMENTOS WHERE id_instrumento = :id';
    db.execute(sql, { id })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

Catalogo.crearInstrumento = (datos, callback) => {
    const { nombre_instrumento, codigo_instrumento } = datos;
    const sql = 'INSERT INTO INSTRUMENTOS (nombre_instrumento, codigo_instrumento) VALUES (:nombre_instrumento, :codigo_instrumento)';
    db.execute(sql, { nombre_instrumento, codigo_instrumento }, { autoCommit: true })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

Catalogo.actualizarInstrumento = (id, datos, callback) => {
    const { nombre_instrumento, codigo_instrumento } = datos;
    const sql = 'UPDATE INSTRUMENTOS SET nombre_instrumento = :nombre_instrumento, codigo_instrumento = :codigo_instrumento WHERE id_instrumento = :id';
    db.execute(sql, { nombre_instrumento, codigo_instrumento, id }, { autoCommit: true })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

Catalogo.eliminarInstrumento = (id, callback) => {
    const sql = 'DELETE FROM INSTRUMENTOS WHERE id_instrumento = :id';
    db.execute(sql, { id }, { autoCommit: true })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

// --- 3. MICROPIPETAS ---
Catalogo.obtenerMicropipetas = (callback) => {
    const sql = 'SELECT * FROM MICROPIPETAS';
    db.execute(sql)
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

Catalogo.obtenerMicropipeta_porID = (id, callback) => {
    const sql = 'SELECT * FROM MICROPIPETAS WHERE id_pipeta = :id';
    db.execute(sql, { id })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

Catalogo.crearMicropipeta = (datos, callback) => {
    const { nombre_pipeta, codigo_pipeta, capacidad } = datos;
    const sql = 'INSERT INTO MICROPIPETAS (nombre_pipeta, codigo_pipeta, capacidad) VALUES (:nombre_pipeta, :codigo_pipeta, :capacidad)';
    db.execute(sql, { nombre_pipeta, codigo_pipeta, capacidad }, { autoCommit: true })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

Catalogo.actualizarMicropipeta = (id, datos, callback) => {
    const { nombre_pipeta, codigo_pipeta, capacidad } = datos;
    const sql = 'UPDATE MICROPIPETAS SET nombre_pipeta = :nombre_pipeta, codigo_pipeta = :codigo_pipeta, capacidad = :capacidad WHERE id_pipeta = :id';
    db.execute(sql, { nombre_pipeta, codigo_pipeta, capacidad, id }, { autoCommit: true })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

Catalogo.eliminarMicropipeta = (id, callback) => {
    const sql = 'DELETE FROM MICROPIPETAS WHERE id_pipeta = :id';
    db.execute(sql, { id }, { autoCommit: true })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

// --- 4. EQUIPOS DE LABORATORIO ---
Catalogo.obtenerEquiposLab = (callback) => {
    const sql = 'SELECT * FROM EQUIPOS_LAB';
    db.execute(sql)
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

Catalogo.obtenerEquipoLab_porID = (id, callback) => {
    const sql = 'SELECT * FROM EQUIPOS_LAB WHERE id_equipo = :id';
    db.execute(sql, { id })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

Catalogo.crearEquipoLab = (datos, callback) => {
    const { nombre_equipo, codigo_equipo } = datos;
    const sql = 'INSERT INTO EQUIPOS_LAB (nombre_equipo, codigo_equipo) VALUES (:nombre_equipo, :codigo_equipo)';
    db.execute(sql, { nombre_equipo, codigo_equipo }, { autoCommit: true })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

Catalogo.actualizarEquipoLab = (id, datos, callback) => {
    const { nombre_equipo, codigo_equipo } = datos;
    const sql = 'UPDATE EQUIPOS_LAB SET nombre_equipo = :nombre_equipo, codigo_equipo = :codigo_equipo WHERE id_equipo = :id';
    db.execute(sql, { nombre_equipo, codigo_equipo, id }, { autoCommit: true })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

Catalogo.eliminarEquipoLab = (id, callback) => {
    const sql = 'DELETE FROM EQUIPOS_LAB WHERE id_equipo = :id';
    db.execute(sql, { id }, { autoCommit: true })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

// --- 5. MATERIAL SIEMBRA ---
Catalogo.obtenerMaterialSiembra = (callback) => {
    const sql = 'SELECT * FROM MATERIAL_SIEMBRA';
    db.execute(sql)
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

Catalogo.obtenerMaterialSiembra_porID = (id, callback) => {
    const sql = 'SELECT * FROM MATERIAL_SIEMBRA WHERE id_material_siembra = :id';
    db.execute(sql, { id })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

Catalogo.crearMaterialSiembra = (datos, callback) => {
    const { nombre_material, detalle_medida } = datos;
    const sql = 'INSERT INTO MATERIAL_SIEMBRA (nombre_material, detalle_medida) VALUES (:nombre_material, :detalle_medida)';
    db.execute(sql, { nombre_material, detalle_medida }, { autoCommit: true })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

Catalogo.actualizarMaterialSiembra = (id, datos, callback) => {
    const { nombre_material, detalle_medida } = datos;
    const sql = 'UPDATE MATERIAL_SIEMBRA SET nombre_material = :nombre_material, detalle_medida = :detalle_medida WHERE id_material_siembra = :id';
    db.execute(sql, { nombre_material, detalle_medida, id }, { autoCommit: true })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

Catalogo.eliminarMaterialSiembra = (id, callback) => {
    const sql = 'DELETE FROM MATERIAL_SIEMBRA WHERE id_material_siembra = :id';
    db.execute(sql, { id }, { autoCommit: true })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

// --- 6. DILUYENTES ---
Catalogo.obtenerDiluyentes = (callback) => {
    const sql = 'SELECT * FROM DILUYENTES';
    db.execute(sql)
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

Catalogo.obtenerDiluyente_porID = (id, callback) => {
    const sql = 'SELECT * FROM DILUYENTES WHERE id_diluyente = :id';
    db.execute(sql, { id })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

Catalogo.crearDiluyente = (datos, callback) => {
    const { nombre_diluyente, mililitros } = datos;
    const sql = 'INSERT INTO DILUYENTES (nombre_diluyente, mililitros) VALUES (:nombre_diluyente, :mililitros)';
    db.execute(sql, { nombre_diluyente, mililitros }, { autoCommit: true })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

Catalogo.actualizarDiluyente = (id, datos, callback) => {
    const { nombre_diluyente, mililitros } = datos;
    const sql = 'UPDATE DILUYENTES SET nombre_diluyente = :nombre_diluyente, mililitros = :mililitros WHERE id_diluyente = :id';
    db.execute(sql, { nombre_diluyente, mililitros, id }, { autoCommit: true })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

Catalogo.eliminarDiluyente = (id, callback) => {
    const sql = 'DELETE FROM DILUYENTES WHERE id_diluyente = :id';
    db.execute(sql, { id }, { autoCommit: true })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

// --- 7. EQUIPOS INCUBACION ---
Catalogo.obtenerEquiposIncubacion = (callback) => {
    const sql = 'SELECT * FROM EQUIPOS_INCUBACION';
    db.execute(sql)
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

Catalogo.obtenerEquipoIncubacion_porID = (id, callback) => {
    const sql = 'SELECT * FROM EQUIPOS_INCUBACION WHERE id_incubacion = :id';
    db.execute(sql, { id })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

Catalogo.crearEquipoIncubacion = (datos, callback) => {
    const { nombre_equipo, temperatura_ref } = datos;
    const sql = 'INSERT INTO EQUIPOS_INCUBACION (nombre_equipo, temperatura_ref) VALUES (:nombre_equipo, :temperatura_ref)';
    db.execute(sql, { nombre_equipo, temperatura_ref }, { autoCommit: true })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

Catalogo.actualizarEquipoIncubacion = (id, datos, callback) => {
    const { nombre_equipo, temperatura_ref } = datos;
    const sql = 'UPDATE EQUIPOS_INCUBACION SET nombre_equipo = :nombre_equipo, temperatura_ref = :temperatura_ref WHERE id_incubacion = :id';
    db.execute(sql, { nombre_equipo, temperatura_ref, id }, { autoCommit: true })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

Catalogo.eliminarEquipoIncubacion = (id, callback) => {
    const sql = 'DELETE FROM EQUIPOS_INCUBACION WHERE id_incubacion = :id';
    db.execute(sql, { id }, { autoCommit: true })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

// --- 8. MAESTRO CHECKLIST LIMPIEZA ---
Catalogo.obtenerMaestroChecklistLimpieza = (callback) => {
    const sql = 'SELECT * FROM MAESTRO_CHECKLIST_LIMPIEZA';
    db.execute(sql)
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

Catalogo.obtenerMaestroChecklistLimpieza_porID = (id, callback) => {
    const sql = 'SELECT * FROM MAESTRO_CHECKLIST_LIMPIEZA WHERE id_item = :id';
    db.execute(sql, { id })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

Catalogo.crearMaestroChecklistLimpieza = (datos, callback) => {
    const { id_item, nombre_item, def_seleccionado, def_bloqueado } = datos;
    const sql = 'INSERT INTO MAESTRO_CHECKLIST_LIMPIEZA (id_item, nombre_item, def_seleccionado, def_bloqueado) VALUES (:id_item, :nombre_item, :def_seleccionado, :def_bloqueado)';
    db.execute(sql, { id_item, nombre_item, def_seleccionado, def_bloqueado }, { autoCommit: true })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

Catalogo.actualizarMaestroChecklistLimpieza = (id, datos, callback) => {
    const { nombre_item, def_seleccionado, def_bloqueado } = datos;
    const sql = 'UPDATE MAESTRO_CHECKLIST_LIMPIEZA SET nombre_item = :nombre_item, def_seleccionado = :def_seleccionado, def_bloqueado = :def_bloqueado WHERE id_item = :id';
    db.execute(sql, { nombre_item, def_seleccionado, def_bloqueado, id }, { autoCommit: true })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

Catalogo.eliminarMaestroChecklistLimpieza = (id, callback) => {
    const sql = 'DELETE FROM MAESTRO_CHECKLIST_LIMPIEZA WHERE id_item = :id';
    db.execute(sql, { id }, { autoCommit: true })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

// --- 9. MAESTRO TIPOS ANALISIS ---
Catalogo.obtenerMaestroTiposAnalisis = (callback) => {
    const sql = 'SELECT * FROM MAESTRO_TIPOS_ANALISIS';
    db.execute(sql)
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

Catalogo.obtenerMaestroTiposAnalisis_porID = (id, callback) => {
    const sql = 'SELECT * FROM MAESTRO_TIPOS_ANALISIS WHERE id_tipo_analisis = :id';
    db.execute(sql, { id })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

Catalogo.crearMaestroTipoAnalisis = (datos, callback) => {
    const { nombre_analisis } = datos;
    const sql = 'INSERT INTO MAESTRO_TIPOS_ANALISIS (nombre_analisis) VALUES (:nombre_analisis)';
    db.execute(sql, { nombre_analisis }, { autoCommit: true })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

Catalogo.actualizarMaestroTipoAnalisis = (id, datos, callback) => {
    const { nombre_analisis } = datos;
    const sql = 'UPDATE MAESTRO_TIPOS_ANALISIS SET nombre_analisis = :nombre_analisis WHERE id_tipo_analisis = :id';
    db.execute(sql, { nombre_analisis, id }, { autoCommit: true })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

Catalogo.eliminarMaestroTipoAnalisis = (id, callback) => {
    const sql = 'DELETE FROM MAESTRO_TIPOS_ANALISIS WHERE id_tipo_analisis = :id';
    db.execute(sql, { id }, { autoCommit: true })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

// --- 10. MAESTRO FORMAS CALCULO ---
Catalogo.obtenerMaestroFormasCalculo = (callback) => {
    const sql = 'SELECT * FROM MAESTRO_FORMAS_CALCULO';
    db.execute(sql)
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

Catalogo.obtenerMaestroFormasCalculo_porID = (id, callback) => {
    const sql = 'SELECT * FROM MAESTRO_FORMAS_CALCULO WHERE id_forma = :id';
    db.execute(sql, { id })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

Catalogo.crearMaestroFormaCalculo = (datos, callback) => {
    const { id_forma, nombre_forma, def_seleccionado } = datos;
    const sql = 'INSERT INTO MAESTRO_FORMAS_CALCULO (id_forma, nombre_forma, def_seleccionado) VALUES (:id_forma, :nombre_forma, :def_seleccionado)';
    db.execute(sql, { id_forma, nombre_forma, def_seleccionado }, { autoCommit: true })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

Catalogo.actualizarMaestroFormaCalculo = (id, datos, callback) => {
    const { nombre_forma, def_seleccionado } = datos;
    const sql = 'UPDATE MAESTRO_FORMAS_CALCULO SET nombre_forma = :nombre_forma, def_seleccionado = :def_seleccionado WHERE id_forma = :id';
    db.execute(sql, { nombre_forma, def_seleccionado, id }, { autoCommit: true })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

Catalogo.eliminarMaestroFormaCalculo = (id, callback) => {
    const sql = 'DELETE FROM MAESTRO_FORMAS_CALCULO WHERE id_forma = :id';
    db.execute(sql, { id }, { autoCommit: true })
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

// --- VISTA UNIFICADA ---
/**
 * Obtiene la unión de Pipetas e Instrumentos desde la vista V_CATALOGO_UNIFICADO.
 */
Catalogo.getMaterialesPesado = (callback) => {
    const sql = 'SELECT * FROM V_CATALOGO_UNIFICADO';
    db.execute(sql)
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

module.exports = Catalogo;
