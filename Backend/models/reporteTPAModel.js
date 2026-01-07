const db = require('../config/DB.js');

const ReporteTPA = {};

/**
 * Crea un reporte TPA inicial cuando se crea una muestra ALI
 * Estado inicial: NO_REALIZADO
 */
ReporteTPA.crearReporteTPAInicial = async (codigoALI, idLugarDefecto = null) => {
    try {
        const sql = `
            INSERT INTO TPA_REPORTE (
                codigo_ali, 
                id_lugar, 
                estado_actual,
                observaciones_ingreso,
                observaciones_finales,
                firma_digital,
                observaciones_generales_analistas
            ) VALUES (
                :codigo_ali,
                :id_lugar,
                'NO_REALIZADO',
                NULL,
                NULL,
                'Sin firma',
                NULL
            )
        `;

        const result = await db.execute(sql, {
            codigo_ali: codigoALI,
            id_lugar: idLugarDefecto || 1 // Lugar por defecto si no se especifica
        }, { autoCommit: true });

        return { success: true, result };
    } catch (error) {
        console.error('Error al crear reporte TPA inicial:', error);
        throw error;
    }
};

/**
 * Obtiene el reporte TPA completo con todas sus etapas
 */
ReporteTPA.obtenerReporteTPA = async (codigoALI) => {
    let connection;
    try {
        connection = await db.getConnection();

        // 1. Obtener datos principales del reporte
        const sqlReporte = `
            SELECT 
                r.codigo_ali,
                r.id_lugar,
                l.nombre_lugar as lugar_almacenamiento,
                r.observaciones_ingreso,
                r.estado_actual as estado,
                r.fecha_cierre,
                r.usuario_cierre,
                r.observaciones_finales,
                r.firma_digital,
                r.observaciones_generales_analistas
            FROM TPA_REPORTE r
            LEFT JOIN LUGARES_ALMACENAMIENTO l ON r.id_lugar = l.id_lugar
            WHERE r.codigo_ali = :codigo_ali
        `;
        const resultReporte = await connection.execute(sqlReporte, { codigo_ali: codigoALI });

        if (resultReporte.rows.length === 0) {
            return null;
        }

        const reporte = {
            codigoALI: resultReporte.rows[0][0],
            etapa1: {
                lugarAlmacenamiento: resultReporte.rows[0][2],
                observaciones: resultReporte.rows[0][3]
            },
            estado: resultReporte.rows[0][4],
            etapa2_manipulacion: [],
            etapa3_limpieza: { checklist: [] },
            etapa4_retiro: [],
            etapa5_siembra: {
                diluyentes: [],
                equipos: [],
                materiales: [],
                otrosEquipos: ''
            },
            etapa6_cierre: {
                observaciones: resultReporte.rows[0][7],
                firma: resultReporte.rows[0][8]
            }
        };

        // 2. Obtener sesiones de Etapa 2 (Manipulación)
        const sqlEtapa2 = `
            SELECT 
                s.id_sesion,
                s.rut_analista,
                u.nombre_apellido_analista as responsable,
                s.fecha_inicio,
                s.fecha_termino,
                s.numero_muestras,
                s.observaciones_sesion,
                s.retiro_pesado
            FROM TPA_ETAPA2_SESION s
            LEFT JOIN USUARIOS u ON s.rut_analista = u.rut_analista
            WHERE s.codigo_ali = :codigo_ali
            ORDER BY s.id_sesion
        `;
        const resultEtapa2 = await connection.execute(sqlEtapa2, { codigo_ali: codigoALI });

        for (const row of resultEtapa2.rows) {
            const idSesion = row[0];

            // Obtener equipos de esta sesión
            const sqlEquipos = `
                SELECT e.nombre_equipo
                FROM TPA_ETAPA2_EQUIPOS eq
                JOIN EQUIPOS_LAB e ON eq.id_equipo = e.id_equipo
                WHERE eq.id_sesion = :id_sesion
            `;
            const resultEquipos = await connection.execute(sqlEquipos, { id_sesion: idSesion });

            // Obtener materiales de esta sesión
            const sqlMateriales = `
                SELECT 
                    m.tipo_material,
                    m.codigo_manual,
                    p.codigo_pipeta,
                    i.codigo_instrumento
                FROM TPA_ETAPA2_MATERIALES m
                LEFT JOIN MICROPIPETAS p ON m.id_pipeta = p.id_pipeta
                LEFT JOIN INSTRUMENTOS i ON m.id_instrumento = i.id_instrumento
                WHERE m.id_sesion = :id_sesion
            `;
            const resultMateriales = await connection.execute(sqlMateriales, { id_sesion: idSesion });

            reporte.etapa2_manipulacion.push({
                id: idSesion,
                responsable: row[2],
                fechaPreparacion: row[3],
                horaInicio: row[3] ? new Date(row[3]).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }) : '',
                horaPesado: row[4] ? new Date(row[4]).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }) : '',
                numeroMuestras: row[5],
                observacionesEtapa2: row[6],
                tipoAccion: row[7] === 1 ? 'Pesado' : 'Retiro',
                equiposSeleccionados: resultEquipos.rows.map(e => e[0]),
                listaMateriales: resultMateriales.rows.map((m, idx) => ({
                    id: idx,
                    tipoMaterial: m[1] || m[2] || m[3] || '',
                    codigoMaterial: m[1] || m[2] || m[3] || ''
                }))
            });
        }

        // 3. Obtener Etapa 3 (Checklist)
        const sqlEtapa3 = `
            SELECT 
                id_checklist,
                nombre_item,
                seleccionado,
                bloqueado
            FROM TPA_ETAPA3_CHECKLIST
            WHERE codigo_ali = :codigo_ali
        `;
        const resultEtapa3 = await connection.execute(sqlEtapa3, { codigo_ali: codigoALI });

        reporte.etapa3_limpieza.checklist = resultEtapa3.rows.map(row => ({
            id: row[0],
            nombre: row[1],
            seleccionado: row[2] === 1,
            bloqueado: row[3] === 1
        }));

        // 4. Obtener Etapa 4 (Retiro)
        const sqlEtapa4 = `
            SELECT 
                r.id_retiro,
                u.nombre_apellido_analista as responsable,
                r.fecha_retiro,
                r.accion_realizada
            FROM TPA_ETAPA4_RETIRO r
            LEFT JOIN USUARIOS u ON r.rut_analista = u.rut_analista
            WHERE r.codigo_ali = :codigo_ali
            ORDER BY r.id_retiro
        `;
        const resultEtapa4 = await connection.execute(sqlEtapa4, { codigo_ali: codigoALI });

        reporte.etapa4_retiro = resultEtapa4.rows.map(row => ({
            id: row[0],
            responsable: row[1],
            fecha: row[2] ? new Date(row[2]).toISOString().split('T')[0] : '',
            horaInicio: row[2] ? new Date(row[2]).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }) : '',
            analisisARealizar: row[3]
        }));

        // 5. Obtener Etapa 5 (Siembra)
        const sqlEtapa5 = `
            SELECT 
                id_siembra,
                observaciones_siembra,
                otros_equipos_texto
            FROM TPA_ETAPA5_SIEMBRA
            WHERE codigo_ali = :codigo_ali
        `;
        const resultEtapa5 = await connection.execute(sqlEtapa5, { codigo_ali: codigoALI });

        if (resultEtapa5.rows.length > 0) {
            const idSiembra = resultEtapa5.rows[0][0];
            reporte.etapa5_siembra.otrosEquipos = resultEtapa5.rows[0][2] || '';

            // Obtener recursos de siembra (diluyentes, equipos, materiales)
            const sqlRecursos = `
                SELECT 
                    r.categoria_recurso,
                    r.id_material_siembra,
                    r.codigo_material,
                    r.id_diluyente,
                    r.codigo_diluyente,
                    r.id_incubacion,
                    r.seleccionado,
                    m.nombre_material,
                    d.nombre_diluyente,
                    e.nombre_equipo
                FROM TPA_ETAPA5_RECURSOS r
                LEFT JOIN MATERIAL_SIEMBRA m ON r.id_material_siembra = m.id_material_siembra
                LEFT JOIN DILUYENTES d ON r.id_diluyente = d.id_diluyente
                LEFT JOIN EQUIPOS_INCUBACION e ON r.id_incubacion = e.id_incubacion
                WHERE r.id_siembra = :id_siembra
            `;
            const resultRecursos = await connection.execute(sqlRecursos, { id_siembra: idSiembra });

            resultRecursos.rows.forEach((row, idx) => {
                const categoria = row[0];
                if (categoria === 'DILUYENTE') {
                    reporte.etapa5_siembra.diluyentes.push({
                        id: idx,
                        nombre: row[8],
                        codigoDiluyente: row[4]
                    });
                } else if (categoria === 'EQUIPO') {
                    reporte.etapa5_siembra.equipos.push({
                        id: idx,
                        nombre: row[9],
                        seleccionado: row[6] === 1
                    });
                } else if (categoria === 'MATERIAL') {
                    reporte.etapa5_siembra.materiales.push({
                        id: idx,
                        nombre: row[7],
                        codigoMaterialSiembra: row[2]
                    });
                }
            });
        }

        return reporte;

    } catch (error) {
        console.error('Error al obtener reporte TPA:', error);
        throw error;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('Error al cerrar conexión:', err);
            }
        }
    }
};

/**
 * Guarda o actualiza el reporte TPA completo
 * Usa transacciones para garantizar consistencia
 */
ReporteTPA.guardarReporteCompleto = async (datos, rutUsuario = null) => {
    let connection;
    try {
        connection = await db.getConnection();

        // Iniciar transacción
        await connection.execute('SAVEPOINT inicio_guardado');

        const { codigoALI, estado, etapa1, etapa2_manipulacion, etapa3_limpieza,
            etapa4_retiro, etapa5_siembra, etapa6_cierre } = datos;

        // 1. Actualizar tabla principal TPA_REPORTE (incluyendo campos de auditoría)
        const sqlUpdateReporte = `
            UPDATE TPA_REPORTE SET
                observaciones_ingreso = :observaciones,
                estado_actual = :estado,
                observaciones_finales = :obs_finales,
                firma_digital = :firma,
                observaciones_generales_analistas = :obs_generales,
                usuario_ultima_modificacion = :rut_usuario
            WHERE codigo_ali = :codigo_ali
        `;

        await connection.execute(sqlUpdateReporte, {
            codigo_ali: codigoALI,
            observaciones: etapa1?.observaciones || null,
            estado: estado || 'BORRADOR',
            obs_finales: etapa6_cierre?.observaciones || null,
            firma: etapa6_cierre?.firma || 'Sin firma',
            obs_generales: datos.observacionesGenerales || null,
            rut_usuario: rutUsuario
        });

        // 2. Actualizar lugar de almacenamiento si viene en etapa1
        if (etapa1?.lugarAlmacenamiento) {
            const sqlLugar = `
                SELECT id_lugar FROM LUGARES_ALMACENAMIENTO 
                WHERE nombre_lugar = :nombre_lugar
            `;
            const resultLugar = await connection.execute(sqlLugar, {
                nombre_lugar: etapa1.lugarAlmacenamiento
            });

            if (resultLugar.rows.length > 0) {
                const idLugar = resultLugar.rows[0][0];
                await connection.execute(
                    'UPDATE TPA_REPORTE SET id_lugar = :id_lugar WHERE codigo_ali = :codigo_ali',
                    { id_lugar: idLugar, codigo_ali: codigoALI }
                );
            }
        }

        // 3. Limpiar y guardar Etapa 2 (Manipulación)
        await connection.execute(
            'DELETE FROM TPA_ETAPA2_SESION WHERE codigo_ali = :codigo_ali',
            { codigo_ali: codigoALI }
        );

        if (etapa2_manipulacion && etapa2_manipulacion.length > 0) {
            for (const sesion of etapa2_manipulacion) {
                // Buscar RUT del analista por nombre
                const sqlRut = `
                    SELECT rut_analista FROM USUARIOS 
                    WHERE nombre_apellido_analista = :nombre
                `;
                const resultRut = await connection.execute(sqlRut, {
                    nombre: sesion.responsable
                });

                if (resultRut.rows.length === 0) continue;

                const rutAnalista = resultRut.rows[0][0];

                // Crear fecha/hora combinadas
                const fechaInicio = sesion.fechaPreparacion && sesion.horaInicio
                    ? new Date(`${sesion.fechaPreparacion}T${sesion.horaInicio}`)
                    : new Date();

                const fechaTermino = sesion.fechaPreparacion && sesion.horaPesado
                    ? new Date(`${sesion.fechaPreparacion}T${sesion.horaPesado}`)
                    : null;

                // Insertar sesión
                const sqlSesion = `
                    INSERT INTO TPA_ETAPA2_SESION (
                        codigo_ali, rut_analista, fecha_inicio, fecha_termino,
                        numero_muestras, observaciones_sesion, retiro_pesado
                    ) VALUES (
                        :codigo_ali, :rut, :fecha_inicio, :fecha_termino,
                        :num_muestras, :obs, :retiro_pesado
                    ) RETURNING id_sesion INTO :id_sesion
                `;

                const bindVars = {
                    codigo_ali: codigoALI,
                    rut: rutAnalista,
                    fecha_inicio: fechaInicio,
                    fecha_termino: fechaTermino,
                    num_muestras: sesion.numeroMuestras,
                    obs: sesion.observacionesEtapa2,
                    retiro_pesado: sesion.tipoAccion === 'Pesado' ? 1 : 0,
                    id_sesion: { dir: db.oracledb.BIND_OUT, type: db.oracledb.NUMBER }
                };

                const resultSesion = await connection.execute(sqlSesion, bindVars);
                const idSesion = resultSesion.outBinds.id_sesion[0];

                // Insertar equipos de la sesión
                if (sesion.equiposSeleccionados && sesion.equiposSeleccionados.length > 0) {
                    for (const nombreEquipo of sesion.equiposSeleccionados) {
                        const sqlEquipoId = `
                            SELECT id_equipo FROM EQUIPOS_LAB 
                            WHERE nombre_equipo = :nombre
                        `;
                        const resultEquipo = await connection.execute(sqlEquipoId, {
                            nombre: nombreEquipo
                        });

                        if (resultEquipo.rows.length > 0) {
                            const idEquipo = resultEquipo.rows[0][0];
                            await connection.execute(
                                `INSERT INTO TPA_ETAPA2_EQUIPOS (id_sesion, id_equipo) 
                                 VALUES (:id_sesion, :id_equipo)`,
                                { id_sesion: idSesion, id_equipo: idEquipo }
                            );
                        }
                    }
                }

                // Insertar materiales de la sesión
                if (sesion.listaMateriales && sesion.listaMateriales.length > 0) {
                    for (const material of sesion.listaMateriales) {
                        if (!material.tipoMaterial || !material.codigoMaterial) continue;

                        // Intentar buscar en pipetas
                        const sqlPipeta = `
                            SELECT id_pipeta FROM MICROPIPETAS 
                            WHERE codigo_pipeta = :codigo
                        `;
                        const resultPipeta = await connection.execute(sqlPipeta, {
                            codigo: material.tipoMaterial
                        });

                        // Intentar buscar en instrumentos
                        const sqlInstrumento = `
                            SELECT id_instrumento FROM INSTRUMENTOS 
                            WHERE codigo_instrumento = :codigo
                        `;
                        const resultInstrumento = await connection.execute(sqlInstrumento, {
                            codigo: material.tipoMaterial
                        });

                        const sqlMaterial = `
                            INSERT INTO TPA_ETAPA2_MATERIALES (
                                id_sesion, tipo_material, id_pipeta, id_instrumento, codigo_manual
                            ) VALUES (
                                :id_sesion, :tipo, :id_pipeta, :id_instrumento, :codigo_manual
                            )
                        `;

                        await connection.execute(sqlMaterial, {
                            id_sesion: idSesion,
                            tipo: resultPipeta.rows.length > 0 ? 'PIPETA' :
                                resultInstrumento.rows.length > 0 ? 'INSTRUMENTO' : 'MANUAL',
                            id_pipeta: resultPipeta.rows.length > 0 ? resultPipeta.rows[0][0] : null,
                            id_instrumento: resultInstrumento.rows.length > 0 ? resultInstrumento.rows[0][0] : null,
                            codigo_manual: material.codigoMaterial
                        });
                    }
                }
            }
        }

        // 4. Limpiar y guardar Etapa 3 (Checklist)
        await connection.execute(
            'DELETE FROM TPA_ETAPA3_CHECKLIST WHERE codigo_ali = :codigo_ali',
            { codigo_ali: codigoALI }
        );

        if (etapa3_limpieza?.checklist && etapa3_limpieza.checklist.length > 0) {
            for (const item of etapa3_limpieza.checklist) {
                const sqlChecklist = `
                    INSERT INTO TPA_ETAPA3_CHECKLIST (
                        codigo_ali, nombre_item, seleccionado, bloqueado
                    ) VALUES (
                        :codigo_ali, :nombre, :seleccionado, :bloqueado
                    )
                `;

                await connection.execute(sqlChecklist, {
                    codigo_ali: codigoALI,
                    nombre: item.nombre,
                    seleccionado: item.seleccionado ? 1 : 0,
                    bloqueado: item.bloqueado ? 1 : 0
                });
            }
        }

        // 5. Limpiar y guardar Etapa 4 (Retiro)
        await connection.execute(
            'DELETE FROM TPA_ETAPA4_RETIRO WHERE codigo_ali = :codigo_ali',
            { codigo_ali: codigoALI }
        );

        if (etapa4_retiro && etapa4_retiro.length > 0) {
            for (const retiro of etapa4_retiro) {
                // Buscar RUT del analista
                const sqlRut = `
                    SELECT rut_analista FROM USUARIOS 
                    WHERE nombre_apellido_analista = :nombre
                `;
                const resultRut = await connection.execute(sqlRut, {
                    nombre: retiro.responsable
                });

                if (resultRut.rows.length === 0) continue;

                const rutAnalista = resultRut.rows[0][0];
                const fechaRetiro = retiro.fecha && retiro.horaInicio
                    ? new Date(`${retiro.fecha}T${retiro.horaInicio}`)
                    : new Date();

                const sqlRetiro = `
                    INSERT INTO TPA_ETAPA4_RETIRO (
                        codigo_ali, rut_analista, fecha_retiro, accion_realizada
                    ) VALUES (
                        :codigo_ali, :rut, :fecha, :accion
                    )
                `;

                await connection.execute(sqlRetiro, {
                    codigo_ali: codigoALI,
                    rut: rutAnalista,
                    fecha: fechaRetiro,
                    accion: retiro.analisisARealizar
                });
            }
        }

        // 6. Limpiar y guardar Etapa 5 (Siembra)
        const sqlDeleteSiembra = `
            DELETE FROM TPA_ETAPA5_SIEMBRA WHERE codigo_ali = :codigo_ali
        `;
        await connection.execute(sqlDeleteSiembra, { codigo_ali: codigoALI });

        if (etapa5_siembra) {
            const sqlSiembra = `
                INSERT INTO TPA_ETAPA5_SIEMBRA (
                    codigo_ali, otros_equipos_texto
                ) VALUES (
                    :codigo_ali, :otros_equipos
                ) RETURNING id_siembra INTO :id_siembra
            `;

            const bindVarsSiembra = {
                codigo_ali: codigoALI,
                otros_equipos: etapa5_siembra.otrosEquipos || '',
                id_siembra: { dir: db.oracledb.BIND_OUT, type: db.oracledb.NUMBER }
            };

            const resultSiembra = await connection.execute(sqlSiembra, bindVarsSiembra);
            const idSiembra = resultSiembra.outBinds.id_siembra[0];

            // Insertar diluyentes
            if (etapa5_siembra.diluyentes && etapa5_siembra.diluyentes.length > 0) {
                for (const diluyente of etapa5_siembra.diluyentes) {
                    const sqlDiluyente = `
                        SELECT id_diluyente FROM DILUYENTES 
                        WHERE nombre_diluyente = :nombre
                    `;
                    const resultDil = await connection.execute(sqlDiluyente, {
                        nombre: diluyente.nombre
                    });

                    if (resultDil.rows.length > 0) {
                        await connection.execute(
                            `INSERT INTO TPA_ETAPA5_RECURSOS (
                                id_siembra, categoria_recurso, id_diluyente, codigo_diluyente
                            ) VALUES (
                                :id_siembra, 'DILUYENTE', :id_dil, :codigo
                            )`,
                            {
                                id_siembra: idSiembra,
                                id_dil: resultDil.rows[0][0],
                                codigo: diluyente.codigoDiluyente
                            }
                        );
                    }
                }
            }

            // Insertar equipos
            if (etapa5_siembra.equipos && etapa5_siembra.equipos.length > 0) {
                for (const equipo of etapa5_siembra.equipos) {
                    const sqlEquipo = `
                        SELECT id_incubacion FROM EQUIPOS_INCUBACION 
                        WHERE nombre_equipo = :nombre
                    `;
                    const resultEq = await connection.execute(sqlEquipo, {
                        nombre: equipo.nombre
                    });

                    if (resultEq.rows.length > 0) {
                        await connection.execute(
                            `INSERT INTO TPA_ETAPA5_RECURSOS (
                                id_siembra, categoria_recurso, id_incubacion, seleccionado
                            ) VALUES (
                                :id_siembra, 'EQUIPO', :id_eq, :seleccionado
                            )`,
                            {
                                id_siembra: idSiembra,
                                id_eq: resultEq.rows[0][0],
                                seleccionado: equipo.seleccionado ? 1 : 0
                            }
                        );
                    }
                }
            }

            // Insertar materiales
            if (etapa5_siembra.materiales && etapa5_siembra.materiales.length > 0) {
                for (const material of etapa5_siembra.materiales) {
                    const sqlMat = `
                        SELECT id_material_siembra FROM MATERIAL_SIEMBRA 
                        WHERE nombre_material = :nombre
                    `;
                    const resultMat = await connection.execute(sqlMat, {
                        nombre: material.nombre
                    });

                    if (resultMat.rows.length > 0) {
                        await connection.execute(
                            `INSERT INTO TPA_ETAPA5_RECURSOS (
                                id_siembra, categoria_recurso, id_material_siembra, codigo_material
                            ) VALUES (
                                :id_siembra, 'MATERIAL', :id_mat, :codigo
                            )`,
                            {
                                id_siembra: idSiembra,
                                id_mat: resultMat.rows[0][0],
                                codigo: material.codigoMaterialSiembra
                            }
                        );
                    }
                }
            }
        }

        // Commit de la transacción
        await connection.commit();

        return { success: true, message: 'Reporte TPA guardado exitosamente' };

    } catch (error) {
        console.error('Error al guardar reporte TPA:', error);
        if (connection) {
            try {
                await connection.execute('ROLLBACK TO SAVEPOINT inicio_guardado');
            } catch (rollbackErr) {
                console.error('Error en rollback:', rollbackErr);
            }
        }
        throw error;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('Error al cerrar conexión:', err);
            }
        }
    }
};

/**
 * Actualiza el estado del reporte TPA
 */
ReporteTPA.actualizarEstadoReporte = async (codigoALI, nuevoEstado) => {
    try {
        const estadosValidos = ['NO_REALIZADO', 'BORRADOR', 'VERIFICADO'];

        if (!estadosValidos.includes(nuevoEstado)) {
            throw new Error(`Estado inválido: ${nuevoEstado}`);
        }

        const sql = `
            UPDATE TPA_REPORTE 
            SET estado_actual = :estado
            WHERE codigo_ali = :codigo_ali
        `;

        const result = await db.execute(sql, {
            codigo_ali: codigoALI,
            estado: nuevoEstado
        }, { autoCommit: true });

        return { success: true, result };
    } catch (error) {
        console.error('Error al actualizar estado del reporte:', error);
        throw error;
    }
};

/**
 * Verifica el reporte (marca como VERIFICADO y registra cierre)
 */
ReporteTPA.verificarReporte = async (codigoALI, rutUsuario, observacionesFinales, firma) => {
    try {
        const sql = `
            UPDATE TPA_REPORTE SET
                estado_actual = 'VERIFICADO',
                fecha_cierre = SYSDATE,
                usuario_cierre = :rut_usuario,
                observaciones_finales = :obs_finales,
                firma_digital = :firma
            WHERE codigo_ali = :codigo_ali
        `;

        const result = await db.execute(sql, {
            codigo_ali: codigoALI,
            rut_usuario: rutUsuario,
            obs_finales: observacionesFinales,
            firma: firma || 'Sin firma'
        }, { autoCommit: true });

        return { success: true, result };
    } catch (error) {
        console.error('Error al verificar reporte:', error);
        throw error;
    }
};

/**
 * Obtiene el estado actual del reporte
 */
ReporteTPA.obtenerEstadoReporte = async (codigoALI) => {
    try {
        const sql = `
            SELECT estado_actual 
            FROM TPA_REPORTE 
            WHERE codigo_ali = :codigo_ali
        `;

        const result = await db.execute(sql, { codigo_ali: codigoALI });

        if (result.rows.length === 0) {
            return null;
        }

        return result.rows[0][0];
    } catch (error) {
        console.error('Error al obtener estado del reporte:', error);
        throw error;
    }
};

module.exports = ReporteTPA;