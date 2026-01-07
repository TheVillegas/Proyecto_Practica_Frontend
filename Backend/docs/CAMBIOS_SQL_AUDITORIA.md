# Actualización del Script SQL - Campos de Auditoría TPA

## ✅ Cambios Realizados

He actualizado el archivo **[Base de Datos AssisTec.sql](file:///c:/Users/mvllg/OneDrive/Documentos/Documentos%20Practica/Proyecto_Practica/Proyecto_Practica/Frontend/BD/Base%20de%20Datos%20AssisTec.sql)** con los campos de auditoría necesarios.

### 1. Campos Agregados a `TPA_REPORTE`

```sql
-- Campos de auditoría
fecha_ultima_modificacion TIMESTAMP DEFAULT SYSDATE,
usuario_ultima_modificacion VARCHAR2(20),
```

### 2. Foreign Key Agregada

```sql
CONSTRAINT FK_tpa_usr_modificacion FOREIGN KEY (usuario_ultima_modificacion) 
    REFERENCES USUARIOS(rut_analista)
```

### 3. Trigger Automático Creado

```sql
CREATE OR REPLACE TRIGGER TRG_TPA_AUDIT
BEFORE UPDATE ON TPA_REPORTE
FOR EACH ROW
BEGIN
    :NEW.fecha_ultima_modificacion := SYSDATE;
END;
/
```

---

## 📋 Resumen de Cambios

| Campo | Tipo | Propósito |
|-------|------|-----------|
| `fecha_ultima_modificacion` | TIMESTAMP | Se actualiza automáticamente cada vez que se modifica el reporte |
| `usuario_ultima_modificacion` | VARCHAR2(20) | Almacena el RUT del usuario que hizo la última modificación |

---

## 🔄 Qué Hacer Ahora

### Si NO has creado la base de datos aún:

✅ **Simplemente ejecuta el script actualizado** `Base de Datos AssisTec.sql` y todo estará listo.

### Si YA tienes la base de datos creada:

Tienes 2 opciones:

**Opción A: Ejecutar el script de migración**
```sql
-- Ejecuta este archivo:
@Backend/migrations/add_audit_fields_tpa.sql
```

**Opción B: Ejecutar manualmente los comandos**
```sql
-- 1. Agregar columnas
ALTER TABLE TPA_REPORTE ADD (
    fecha_ultima_modificacion TIMESTAMP DEFAULT SYSDATE,
    usuario_ultima_modificacion VARCHAR2(20)
);

-- 2. Agregar foreign key
ALTER TABLE TPA_REPORTE ADD CONSTRAINT FK_tpa_usr_modificacion 
    FOREIGN KEY (usuario_ultima_modificacion) REFERENCES USUARIOS(rut_analista);

-- 3. Crear trigger
CREATE OR REPLACE TRIGGER TRG_TPA_AUDIT
BEFORE UPDATE ON TPA_REPORTE
FOR EACH ROW
BEGIN
    :NEW.fecha_ultima_modificacion := SYSDATE;
END;
/

-- 4. Actualizar registros existentes
UPDATE TPA_REPORTE 
SET fecha_ultima_modificacion = SYSDATE 
WHERE fecha_ultima_modificacion IS NULL;

COMMIT;
```

---

## ✅ Verificación

Para verificar que los cambios se aplicaron correctamente:

```sql
-- Ver la estructura de la tabla
DESC TPA_REPORTE;

-- Debería mostrar las nuevas columnas:
-- FECHA_ULTIMA_MODIFICACION    TIMESTAMP
-- USUARIO_ULTIMA_MODIFICACION  VARCHAR2(20)

-- Ver el trigger
SELECT trigger_name, status 
FROM user_triggers 
WHERE trigger_name = 'TRG_TPA_AUDIT';

-- Debería mostrar:
-- TRG_TPA_AUDIT    ENABLED
```

---

## 🎯 Funcionamiento

### Automático (Trigger)
Cada vez que se ejecute un `UPDATE` en `TPA_REPORTE`, el trigger actualizará automáticamente `fecha_ultima_modificacion` con la fecha/hora actual.

### Manual (Desde el Backend)
El modelo `reporteTPAModel.js` actualiza `usuario_ultima_modificacion` cuando se llama a `guardarReporteCompleto()`:

```javascript
await connection.execute(sqlUpdateReporte, {
    // ... otros campos
    rut_usuario: rutUsuario  // ← Se guarda aquí
});
```

---

## 📝 Notas Importantes

> [!IMPORTANT]
> **Sin estos campos, el modelo NO funcionará correctamente**
> 
> El código del modelo intenta actualizar `usuario_ultima_modificacion`, por lo que si la columna no existe, obtendrás un error SQL.

> [!TIP]
> **El trigger es opcional pero recomendado**
> 
> Si no creas el trigger, `fecha_ultima_modificacion` solo se actualizará cuando se cree el registro (DEFAULT SYSDATE), pero no en actualizaciones posteriores.

---

## ✅ Ahora el JSON Funcionará Correctamente

Con estos cambios, cuando el frontend envíe:

```json
{
  "codigoALI": "2",
  "rutUsuario": "12345678-9",  // ← Se guardará en usuario_ultima_modificacion
  "estado": "BORRADOR",
  // ... resto de datos
}
```

El backend:
1. ✅ Guardará `rutUsuario` en `usuario_ultima_modificacion`
2. ✅ El trigger actualizará automáticamente `fecha_ultima_modificacion`
3. ✅ No habrá errores SQL por columnas faltantes
