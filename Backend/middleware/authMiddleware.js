/**
 * Middleware de Autenticación Simplificado (Mock para transición a Microservicios)
 * 
 * Este middleware intenta obtener la identidad del usuario desde dos fuentes:
 * 1. Headers (Ideal para API Gateway/Microservicios): x-rut-usuario, x-rol-usuario
 * 2. Body (Legacy/Frontend actual): rutUsuario, rolUsuario

 */
const authMiddleware = (req, res, next) => {
    try {
        let rut = null;
        let rol = null;

        // 1. Intentar leer de Headers (Prioridad Alta - Futuro)
        if (req.headers['x-rut-usuario']) {
            rut = req.headers['x-rut-usuario'];
        }
        if (req.headers['x-rol-usuario']) {
            rol = parseInt(req.headers['x-rol-usuario'], 10);
        }

        // 2. Intentar leer de Body (Fallback - Presente)
        // Nota: Solo leemos del body si no encontramos en headers, o para complementar
        if (!rut && req.body?.rutUsuario) {
            rut = req.body.rutUsuario;
        }
        // Aceptamos rol del body
        if (rol === null && req.body?.rolUsuario !== undefined) {
            rol = parseInt(req.body.rolUsuario, 10);
        }

        // 3. Inyectar identidad en la request
        req.user = {
            rut: rut,
            rol: rol
        };

        // Log para depuración (Quitar en producción real)
        // console.log(`[AuthMiddleware] Identidad detectada -> RUT: ${rut}, ROL: ${rol}`);

        next();
    } catch (error) {
        console.error('[AuthMiddleware] Error procesando identidad:', error);
        // En caso de error, dejamos pasar pero sin identidad, o podríamos bloquear con 500
        // Por seguridad, mejor next() y que el controlador decida si necesita req.user válido
        req.user = { rut: null, rol: null };
        next();
    }
};

module.exports = authMiddleware;
