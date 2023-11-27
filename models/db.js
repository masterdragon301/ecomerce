const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: "mysql-megumin301.alwaysdata.net",
    user: "329907_carlos",  // Elimina el espacio antes de '329907_carlos'
    password: "CANPEOn123",
    database: "megumin301_carlos",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
