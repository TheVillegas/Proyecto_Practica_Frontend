-- Script de migración para agregar campos de auditoría a TPA_REPORTE
-- Estos campos permiten rastrear quién y cuándo modificó el reporte por última vez

-- Agregar campos de auditoría
ALTER TABLE TPA_REPORTE ADD (
    fecha_ultima_modificacion TIMESTAMP DEFAULT SYSDATE,
    usuario_ultima_modificacion VARCHAR2(20)
);

-- Agregar foreign key para el usuario de última modificación
ALTER TABLE TPA_REPORTE ADD CONSTRAINT FK_tpa_usr_modificacion 
    FOREIGN KEY (usuario_ultima_modificacion) REFERENCES USUARIOS(rut_analista);

-- Crear trigger para actualizar automáticamente la fecha de última modificación
CREATE OR REPLACE TRIGGER TRG_TPA_AUDIT
BEFORE UPDATE ON TPA_REPORTE
FOR EACH ROW
BEGIN
    :NEW.fecha_ultima_modificacion := SYSDATE;
END;
/

-- Comentarios en las columnas para documentación
COMMENT ON COLUMN TPA_REPORTE.fecha_ultima_modificacion IS 'Fecha y hora de la última modificación del reporte';
COMMENT ON COLUMN TPA_REPORTE.usuario_ultima_modificacion IS 'RUT del usuario que realizó la última modificación';

-- Actualizar registros existentes con fecha actual
UPDATE TPA_REPORTE 
SET fecha_ultima_modificacion = SYSDATE 
WHERE fecha_ultima_modificacion IS NULL;

COMMIT;
