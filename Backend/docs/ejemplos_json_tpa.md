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

## 2. JSON para GUARDAR Reporte RAM Completo

Este es el JSON que el frontend debe enviar al endpoint `POST /AsisTec/ReporteRAM` para guardar un reporte completo.

```json
{
  "codigoALI": 1432,
  "estado": "PENDIENTE",
  
  "etapa1": {
    "agarPlateCount": "Ram Ruso",
    "equipoIncubacion": 1,
    "nMuestra10gr": 3,
    "nMuestra50gr": 5,
    "horaInicioHomogenizado": "20:01",
    "horaTerminoSiembra": "21:30"
  },
  "etapa2": {
    "responsableAnalisis": 5,
    "responsableIncubacion": "Matias",
    "fechaInicioIncubacion": "2026-01-13",
    "fechaFinIncubacion": "2026-02-16",
    "horaInicioIncubacion": "18:01",
    "horaFinIncubacion": "20:01",
    "micropipetaUtilizada": "Pipeta 94-M"
  },
  "etapa3_repeticiones": [
    {
      "numeroMuestra": 1,
      "disolucion": -1,
      "dil": 1213,
      "disolucion2": -2,
      "dil2": 31313,
      "numeroColonias": [124144, 1141244, 4141, 41414],
      "duplicado": {
        "codigoALI": 1432,
        "disolucion01": 411414,
        "dil01": 123123123,
        "disolucion02": 1413414,
        "dil02": 4114141,
        "numeroColonias": [14141441, 4141414, 41412414, 42141414]
      }
    }
  ],
  "etapa4": {
    "horaInicio": "21:04",
    "horaFin": "22:05",
    "temperatura": 35.5,
    "blancoUfc": 321313,
    "controlUfc": null,
    "controlSiembraEcoli": 231123,
    "controlAmbientalPesado": 12,
    "ufc": 31231
  },
  "etapa5": {
    "desfavorable": "SÍ",
    "mercado": "China",
    "tablaPagina": "w12",
    "limite": "1323",
    "fechaEntrega": "2026-01-07",
    "horaEntrega": "03:13",
    "imagenManual": "data:image/png;base64,iVBO..."
  },
  "etapa6": {
    "analisis": "Recuento Aerobios",
    "controlBlanco": "412",
    "controlBlancoEstado": "CUMPLE",
    "controlSiembra": "412",
    "controlSiembraEstado": "NO_CUMPLE",
    "duplicadoAli": "321",
    "duplicadoEstado": "CUMPLE"
  },
  "etapa7": {
    "observacionesFinales": "32112313131",
    "formaCalculo": "Software",
    "firmaCoordinador": null
  }
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
