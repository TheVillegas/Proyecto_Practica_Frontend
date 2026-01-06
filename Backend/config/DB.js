require('dotenv').config();
const oracledb = require('oracledb');

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECT_STRING
}

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

async function initialize() {
    try {
        await oracledb.createPool(dbConfig);
        console.log("Pool de conexiones creado exitosamente");
    } catch (error) {
        console.error("Error al crear el pool:", error);
        throw error; // Propagar el error para que app.js lo maneje
    }
}

// Wrapper para ejecutar consultas de forma segura
async function execute(sql, binds = {}, options = {}) {
    let connection;
    try {
        connection = await oracledb.getConnection();
        const result = await connection.execute(sql, binds, options);
        return result;
    } catch (err) {
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (closeErr) {
                console.error("Error al cerrar la conexión:", closeErr);
            }
        }
    }
}

module.exports = { initialize, execute };