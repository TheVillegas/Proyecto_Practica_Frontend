# Ejemplos de JSON para Reporte TPA

## 1. JSON para GUARDAR Reporte TPA Completo

Este es el JSON que el frontend debe enviar al endpoint `POST /AsisTec/ReporteTPA` para guardar un reporte completo.

```json
{
  "codigoALI": "2025",
  "rutUsuario": "21449676-3",
  "rolUsuario":"0",
  "estado": "BORRADOR",
  "etapa1": {
    "lugarAlmacenamiento": "Mesón Siembra",
    "observaciones": "Hola Esto es de prueba"
  },
  "etapa2_manipulacion": [
    {
      "id": 0,
      "responsable": "Matias",
      "fechaPreparacion": "2026-01-06",
      "horaInicio": "19:53",
      "horaPesado": "18:53",
      "numeroMuestras": "1 a 3",
      "tipoAccion": "Retiro",
      "observacionesEtapa2": "Observaciones de prueba 1",
      "lugarAlmacenamiento": "Gabinete sala Transpaso",
      "equiposSeleccionados": [
        "Camara Flujo laminar 8-M",
        "Meson de Transpaso",
        "Balanza 6-M"
      ],
      "listaMateriales": [
        {
          "id": 0,
          "tipoMaterial": "72-M",
          "codigoMaterial": "dil//05"
        },
        {
          "id": 1767819183519,
          "tipoMaterial": "cuchara",
          "codigoMaterial": "dill/05"
        },
        {
          "id": 1767819189923,
          "tipoMaterial": "103-M",
          "codigoMaterial": "dill/04"
        }
      ]
    },
    {
      "id": 1767819202711,
      "responsable": "Sandy",
      "fechaPreparacion": "2026-01-05",
      "horaInicio": "18:53",
      "horaPesado": "19:54",
      "numeroMuestras": "4",
      "tipoAccion": "Pesado",
      "observacionesEtapa2": "Observaciones 2",
      "lugarAlmacenamiento": "Refrigerador 33-M",
      "equiposSeleccionados": [
        "Meson de Transpaso",
        "Camara Flujo laminar 8-M"
      ],
      "listaMateriales": [
        {
          "id": 1767819202711,
          "tipoMaterial": "98-M",
          "codigoMaterial": "dill/98"
        },
        {
          "id": 1767819230138,
          "tipoMaterial": "98-M",
          "codigoMaterial": "dill/05"
        }
      ]
    },
    {
      "id": 1767819241109,
      "responsable": "Matias",
      "fechaPreparacion": "2026-01-07T20:54:01.109Z",
      "horaInicio": "",
      "horaPesado": "2026-01-07T20:54:01.109Z",
      "numeroMuestras": null,
      "tipoAccion": "",
      "observacionesEtapa2": "",
      "lugarAlmacenamiento": "",
      "equiposSeleccionados": [],
      "listaMateriales": [
        {
          "id": 1767819241109,
          "tipoMaterial": "",
          "codigoMaterial": ""
        }
      ]
    }
  ],
  "etapa3_limpieza": {
    "checklist": [
      {
        "id": 1,
        "nombre": "Mesón",
        "seleccionado": true,
        "bloqueado": true
      },
      {
        "id": 4,
        "nombre": "Balanza 74-M/108-M",
        "seleccionado": true,
        "bloqueado": false
      },
      {
        "id": 5,
        "nombre": "Balanza 6-M/99-M",
        "seleccionado": true,
        "bloqueado": false
      },
      {
        "id": 7,
        "nombre": "Desinfectante en aerosol",
        "seleccionado": true,
        "bloqueado": true
      }
    ]
  },
  "etapa4_retiro": [
    {
      "id": 0,
      "responsable": "Matias",
      "fecha": "2026-01-05",
      "horaInicio": "18:54",
      "analisisARealizar": "Analisis Objetivo"
    },
    {
      "id": 2,
      "responsable": "Matias",
      "fecha": "2026-01-12",
      "horaInicio": "18:58",
      "analisisARealizar": "Analisis 2 "
    }
  ],
  "etapa5_siembra": {
    "diluyentes": [
      {
        "id": 0,
        "nombre": "SPS Tubos",
        "codigoDiluyente": "dill/121"
      },
      {
        "id": 2,
        "nombre": "SPS sa 90ml",
        "codigoDiluyente": "13213"
      }
    ],
    "equipos": [
      {
        "id": 1,
        "nombre": "Baño-5m",
        "seleccionado": true
      },
      {
        "id": 2,
        "nombre": "Homogenizador 12-m",
        "seleccionado": true
      },
      {
        "id": 4,
        "nombre": "Cuenta Colonias 101-m",
        "seleccionado": true
      }
    ],
    "materiales": [
      {
        "id": 0,
        "nombre": "Asas Drigalsky",
        "codigoMaterialSiembra": "dspdfskdsk1123w13"
      },
      {
        "id": 2,
        "nombre": "Probeta 250 ML",
        "codigoMaterialSiembra": "11111"
      }
    ],
    "otrosEquipos": ""
  },
  "etapa6_cierre": {
    "observaciones": "Observaciones Finales",
    "firma": "Sin firma"
  }
}
```

---

## 2. JSON de RESPUESTA al Obtener Reporte TPA Completo

Este es el JSON que el backend devuelve cuando se hace `GET /AsisTec/ReporteTPA/:codigo_ali`

```json
{
  "codigoALI": "2",
  "estado": "BORRADOR",
  "etapa1": {
    "lugarAlmacenamiento": "Mesón Siembra",
    "observaciones": "Hola Esto es de prueba"
  },
  "etapa2_manipulacion": [
    {
      "id": 1,
      "responsable": "Sandy",
      "fechaPreparacion": "2026-01-06T00:00:00.000Z",
      "horaInicio": "19:53",
      "horaPesado": "18:53",
      "numeroMuestras": "1 a 3",
      "observacionesEtapa2": "Observaciones de prueba 1",
      "tipoAccion": "Retiro",
      "equiposSeleccionados": [
        "Camara Flujo laminar 8-M",
        "Meson de Transpaso",
        "Balanza 6-M"
      ],
      "listaMateriales": [
        {
          "id": 0,
          "tipoMaterial": "72-M",
          "codigoMaterial": "dil//05"
        },
        {
          "id": 1,
          "tipoMaterial": "cuchara",
          "codigoMaterial": "dill/05"
        },
        {
          "id": 2,
          "tipoMaterial": "103-M",
          "codigoMaterial": "dill/04"
        }
      ]
    },
    {
      "id": 2,
      "responsable": "Sandy",
      "fechaPreparacion": "2026-01-05T00:00:00.000Z",
      "horaInicio": "18:53",
      "horaPesado": "19:54",
      "numeroMuestras": "4",
      "observacionesEtapa2": "Observaciones 2",
      "tipoAccion": "Pesado",
      "equiposSeleccionados": [
        "Meson de Transpaso",
        "Camara Flujo laminar 8-M"
      ],
      "listaMateriales": [
        {
          "id": 0,
          "tipoMaterial": "98-M",
          "codigoMaterial": "dill/98"
        },
        {
          "id": 1,
          "tipoMaterial": "98-M",
          "codigoMaterial": "dill/05"
        }
      ]
    }
  ],
  "etapa3_limpieza": {
    "checklist": [
      {
        "id": 1,
        "nombre": "Mesón",
        "seleccionado": true,
        "bloqueado": true
      },
      {
        "id": 2,
        "nombre": "Balanza 74-M/108-M",
        "seleccionado": true,
        "bloqueado": false
      },
      {
        "id": 3,
        "nombre": "Balanza 6-M/99-M",
        "seleccionado": true,
        "bloqueado": false
      },
      {
        "id": 4,
        "nombre": "Desinfectante en aerosol",
        "seleccionado": true,
        "bloqueado": true
      }
    ]
  },
  "etapa4_retiro": [
    {
      "id": 1,
      "responsable": "Matias",
      "fecha": "2026-01-05",
      "horaInicio": "18:54",
      "analisisARealizar": "Analisis Objetivo"
    },
    {
      "id": 2,
      "responsable": "Matias",
      "fecha": "2026-01-12",
      "horaInicio": "18:58",
      "analisisARealizar": "Analisis 2 "
    }
  ],
  "etapa5_siembra": {
    "diluyentes": [
      {
        "id": 0,
        "nombre": "SPS Tubos",
        "codigoDiluyente": "dill/121"
      },
      {
        "id": 1,
        "nombre": "SPS sa 90ml",
        "codigoDiluyente": "13213"
      }
    ],
    "equipos": [
      {
        "id": 0,
        "nombre": "Baño-5m",
        "seleccionado": true
      },
      {
        "id": 1,
        "nombre": "Homogenizador 12-m",
        "seleccionado": true
      },
      {
        "id": 2,
        "nombre": "Cuenta Colonias 101-m",
        "seleccionado": true
      }
    ],
    "materiales": [
      {
        "id": 0,
        "nombre": "Asas Drigalsky",
        "codigoMaterialSiembra": "dspdfskdsk1123w13"
      },
      {
        "id": 1,
        "nombre": "Probeta 250 ML",
        "codigoMaterialSiembra": "11111"
      }
    ],
    "otrosEquipos": ""
  },
  "etapa6_cierre": {
    "observaciones": "Observaciones Finales",
    "firma": "Sin firma"
  }
}
```

---

## 3. JSON de RESPUESTA al Obtener Estado del Reporte

Este es el JSON que el backend devuelve cuando se hace `GET /AsisTec/ReporteTPA/:codigo_ali/estado`

```json
{
  "estado": "BORRADOR"
}
```

**Posibles valores de estado:**
- `"NO_REALIZADO"` - Reporte creado pero no iniciado
- `"BORRADOR"` - Reporte en proceso, permite modificaciones
- `"VERIFICADO"` - Reporte finalizado y verificado, no modificable

---

## 4. JSON para VERIFICAR Reporte

Este es el JSON que el frontend debe enviar al endpoint `PUT /AsisTec/ReporteTPA/:codigo_ali/verificar`

```json
{
  "rut_usuario": "12345678-9",
  "observaciones_finales": "Reporte completado y verificado correctamente. Todos los análisis fueron realizados según protocolo.",
  "firma": "Firma Digital del Coordinador"
}
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Reporte verificado exitosamente"
}
```

---

## 5. JSON para ACTUALIZAR Estado del Reporte

Este es el JSON que el frontend debe enviar al endpoint `PUT /AsisTec/ReporteTPA/:codigo_ali/estado`

```json
{
  "estado": "BORRADOR"
}
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Estado actualizado exitosamente"
}
```

---

## 6. JSON de RESPUESTA cuando el Reporte NO Existe

Cuando se intenta obtener un reporte que no existe:

**Status:** `404 Not Found`

```json
{
  "mensaje": "Reporte TPA no encontrado"
}
```

---

## 7. JSON de ERROR cuando se intenta Modificar un Reporte VERIFICADO

Cuando se intenta guardar cambios en un reporte que ya está verificado:

**Status:** `403 Forbidden`

```json
{
  "mensaje": "No se puede modificar un reporte verificado"
}
```

---

## Notas Importantes

### Mapeo de Nombres a IDs

El backend se encarga automáticamente de convertir los nombres a IDs de base de datos:

- **Responsables**: `"Sandy"` → busca en `USUARIOS` por `nombre_apellido_analista`
- **Equipos**: `"Balanza 6-M"` → busca en `EQUIPOS_LAB` por `nombre_equipo`
- **Materiales/Pipetas**: `"72-M"` → busca en `MICROPIPETAS` por `codigo_pipeta` o en `INSTRUMENTOS` por `codigo_instrumento`
- **Diluyentes**: `"SPS Tubos"` → busca en `DILUYENTES` por `nombre_diluyente`
- **Lugares**: `"Mesón Siembra"` → busca en `LUGARES_ALMACENAMIENTO` por `nombre_lugar`

### Campos Opcionales

Los siguientes campos son opcionales y pueden ser `null` o vacíos:

- `etapa1.observaciones`
- `etapa2_manipulacion[].observacionesEtapa2`
- `etapa5_siembra.otrosEquipos`
- `etapa6_cierre.observaciones`

### Campos Requeridos

- `codigoALI` - Siempre requerido
- `rutUsuario` - Requerido al guardar para auditoría
- `estado` - Debe ser uno de: `NO_REALIZADO`, `BORRADOR`, `VERIFICADO`

### Formato de Fechas y Horas

- **Fechas**: `"YYYY-MM-DD"` (ej: `"2026-01-05"`)
- **Horas**: `"HH:MM"` formato 24 horas (ej: `"18:54"`)
- **Timestamps ISO**: `"YYYY-MM-DDTHH:MM:SS.sssZ"` (ej: `"2026-01-07T20:54:01.109Z"`)

El backend acepta ambos formatos y los convierte automáticamente.
