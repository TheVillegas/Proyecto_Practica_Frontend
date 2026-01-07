# Documentación del Modelo de Reporte TPA

## Descripción General

El modelo de reporte TPA (`reporteTPAModel.js`) proporciona funcionalidad completa para gestionar reportes TPA (Tratamiento Previo de Alimentos) en la base de datos Oracle, incluyendo:

- ✅ Creación automática de reportes al crear muestras ALI
- ✅ Gestión de estados (NO_REALIZADO, BORRADOR, VERIFICADO)
- ✅ Guardado transaccional de todas las etapas del formulario
- ✅ Auditoría de modificaciones (usuario y fecha)
- ✅ Validación de permisos según estado

---

## Estados del Reporte

| Estado | Descripción | Modificable |
|--------|-------------|-------------|
| `NO_REALIZADO` | Estado inicial al crear una muestra ALI | ✅ Sí |
| `BORRADOR` | Reporte en proceso, permite modificaciones | ✅ Sí |
| `VERIFICADO` | Reporte finalizado y verificado | ❌ No |

---

## API Endpoints

### 1. Obtener Reporte TPA

```http
GET /AsisTec/ReporteTPA/:codigo_ali
```

**Respuesta exitosa (200):**
```json
{
  "codigoALI": "2",
  "estado": "BORRADOR",
  "etapa1": {
    "lugarAlmacenamiento": "Mesón Siembra",
    "observaciones": "Hola Esto es de prueba"
  },
  "etapa2_manipulacion": [...],
  "etapa3_limpieza": {...},
  "etapa4_retiro": [...],
  "etapa5_siembra": {...},
  "etapa6_cierre": {...}
}
```

---

### 2. Guardar/Actualizar Reporte TPA

```http
POST /AsisTec/ReporteTPA
```

**Body:**
```json
{
  "codigoALI": "2",
  "rutUsuario": "12345678-9",
  "estado": "BORRADOR",
  "etapa1": {
    "lugarAlmacenamiento": "Mesón Siembra",
    "observaciones": "Observaciones de ingreso"
  },
  "etapa2_manipulacion": [
    {
      "responsable": "Sandy",
      "fechaPreparacion": "2026-01-06",
      "horaInicio": "19:53",
      "horaPesado": "18:53",
      "numeroMuestras": "1 a 3",
      "tipoAccion": "Retiro",
      "observacionesEtapa2": "Observaciones de prueba 1",
      "equiposSeleccionados": ["Camara Flujo laminar 8-M", "Meson de Transpaso"],
      "listaMateriales": [
        {
          "tipoMaterial": "72-M",
          "codigoMaterial": "dil//05"
        }
      ]
    }
  ],
  "etapa3_limpieza": {
    "checklist": [
      {
        "nombre": "Mesón",
        "seleccionado": true,
        "bloqueado": true
      }
    ]
  },
  "etapa4_retiro": [
    {
      "responsable": "Matias",
      "fecha": "2026-01-05",
      "horaInicio": "18:54",
      "analisisARealizar": "Analisis Objetivo"
    }
  ],
  "etapa5_siembra": {
    "diluyentes": [
      {
        "nombre": "SPS Tubos",
        "codigoDiluyente": "dill/121"
      }
    ],
    "equipos": [
      {
        "nombre": "Baño-5m",
        "seleccionado": true
      }
    ],
    "materiales": [
      {
        "nombre": "Asas Drigalsky",
        "codigoMaterialSiembra": "dspdfskdsk1123w13"
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

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Reporte TPA guardado exitosamente"
}
```

**Error - Reporte verificado (403):**
```json
{
  "mensaje": "No se puede modificar un reporte verificado"
}
```

---

### 3. Actualizar Estado del Reporte

```http
PUT /AsisTec/ReporteTPA/:codigo_ali/estado
```

**Body:**
```json
{
  "estado": "VERIFICADO"
}
```

**Estados válidos:** `NO_REALIZADO`, `BORRADOR`, `VERIFICADO`

---

### 4. Verificar Reporte

```http
PUT /AsisTec/ReporteTPA/:codigo_ali/verificar
```

**Body:**
```json
{
  "rut_usuario": "12345678-9",
  "observaciones_finales": "Reporte completado y verificado",
  "firma": "Firma Digital"
}
```

**Efecto:**
- Cambia estado a `VERIFICADO`
- Registra fecha de cierre
- Guarda usuario que verificó
- Guarda observaciones finales y firma

---

### 5. Obtener Estado del Reporte

```http
GET /AsisTec/ReporteTPA/:codigo_ali/estado
```

**Respuesta:**
```json
{
  "estado": "BORRADOR"
}
```

---

## Integración con Frontend

### Ejemplo de uso en el servicio Angular

```typescript
// ali.service.ts

// Obtener reporte TPA
obtenerReporteTPA(codigoALI: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/ReporteTPA/${codigoALI}`);
}

// Guardar reporte TPA
guardarReporteTPA(datos: any, rutUsuario: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/ReporteTPA`, {
    ...datos,
    rutUsuario: rutUsuario
  });
}

// Verificar reporte
verificarReporteTPA(codigoALI: string, rutUsuario: string, observaciones: string, firma: string): Observable<any> {
  return this.http.put(`${this.apiUrl}/ReporteTPA/${codigoALI}/verificar`, {
    rut_usuario: rutUsuario,
    observaciones_finales: observaciones,
    firma: firma
  });
}
```

### Ejemplo en el componente

```typescript
// reporte-tpa.page.ts

guardarBorrador() {
  const datosReporte = {
    codigoALI: this.codigoALI,
    estado: 'BORRADOR',
    etapa1: this.etapa1,
    etapa2_manipulacion: this.etapa2_manipulacion,
    etapa3_limpieza: this.etapa3_limpieza,
    etapa4_retiro: this.etapa4_retiro,
    etapa5_siembra: this.etapa5_siembra,
    etapa6_cierre: this.etapa6_cierre
  };

  // Obtener RUT del usuario actual del servicio de login
  const rutUsuario = this.loginService.getUsuarioActual().rut;

  this.aliService.guardarReporteTPA(datosReporte, rutUsuario).subscribe(
    response => {
      console.log('Reporte guardado:', response);
      this.mostrarMensaje('Borrador guardado exitosamente');
    },
    error => {
      console.error('Error al guardar:', error);
      this.mostrarMensaje('Error al guardar el borrador');
    }
  );
}

verificarReporte() {
  const rutUsuario = this.loginService.getUsuarioActual().rut;
  
  this.aliService.verificarReporteTPA(
    this.codigoALI,
    rutUsuario,
    this.etapa6_cierre.observaciones,
    this.etapa6_cierre.firma
  ).subscribe(
    response => {
      console.log('Reporte verificado:', response);
      this.mostrarMensaje('Reporte verificado exitosamente');
      this.estadoReporte = 'VERIFICADO';
      this.deshabilitarFormulario();
    },
    error => {
      console.error('Error al verificar:', error);
    }
  );
}
```

---

## Migración de Base de Datos

Para agregar los campos de auditoría a la tabla `TPA_REPORTE`, ejecuta el script:

```bash
# Ubicación del script
Backend/migrations/add_audit_fields_tpa.sql
```

**Campos agregados:**
- `fecha_ultima_modificacion` - Timestamp automático al actualizar
- `usuario_ultima_modificacion` - RUT del usuario que modificó

**Trigger creado:**
- `TRG_TPA_AUDIT` - Actualiza automáticamente `fecha_ultima_modificacion` en cada UPDATE

---

## Creación Automática de Reportes TPA

Cuando se crea una muestra ALI mediante:

```http
POST /AsisTec/MuestraALI
```

Se crea automáticamente un reporte TPA con:
- Estado: `NO_REALIZADO`
- Firma: `Sin firma`
- Lugar de almacenamiento: Por defecto (id_lugar = 1)

Esto se maneja en `muestraALIModel.js` mediante una transacción que garantiza que ambos registros se creen o ninguno.

---

## Manejo de Transacciones

El método `guardarReporteCompleto` utiliza transacciones para garantizar consistencia:

1. Inicia un SAVEPOINT
2. Actualiza/inserta en todas las tablas relacionadas
3. Si todo es exitoso: COMMIT
4. Si hay error: ROLLBACK al SAVEPOINT

**Tablas involucradas:**
- `TPA_REPORTE` (principal)
- `TPA_ETAPA2_SESION`
- `TPA_ETAPA2_EQUIPOS`
- `TPA_ETAPA2_MATERIALES`
- `TPA_ETAPA3_CHECKLIST`
- `TPA_ETAPA4_RETIRO`
- `TPA_ETAPA5_SIEMBRA`
- `TPA_ETAPA5_RECURSOS`

---

## Validaciones Implementadas

✅ No se puede modificar un reporte con estado `VERIFICADO`  
✅ El código ALI es requerido en todas las operaciones  
✅ Los estados deben ser válidos (NO_REALIZADO, BORRADOR, VERIFICADO)  
✅ Se valida la existencia de usuarios, equipos y materiales antes de insertar  
✅ Las transacciones garantizan integridad de datos  

---

## Notas Importantes

1. **Auditoría**: Siempre envía el `rutUsuario` al guardar para rastrear modificaciones
2. **Estados**: Respeta el flujo NO_REALIZADO → BORRADOR → VERIFICADO
3. **Transacciones**: No interrumpas el proceso de guardado, las transacciones manejan errores
4. **Nombres vs IDs**: El modelo busca IDs automáticamente basándose en nombres (equipos, usuarios, etc.)
5. **Cascada**: Al eliminar una muestra ALI, se eliminan automáticamente todos los reportes TPA asociados

---

## Soporte para Futuros Reportes

La arquitectura está diseñada para ser extensible. Para agregar nuevos tipos de reportes (ej: RAM):

1. Crear modelo similar a `reporteTPAModel.js`
2. Agregar llamada en `muestraALIModel.crearMuestraALI()`
3. Crear controlador y rutas correspondientes
4. Registrar rutas en `app.js`

Ejemplo:
```javascript
// En muestraALIModel.js
await ReporteTPA.crearReporteTPAInicial(codigo_ali);
await ReporteRAM.crearReporteRAMInicial(codigo_ali);
// ... otros reportes futuros
```
