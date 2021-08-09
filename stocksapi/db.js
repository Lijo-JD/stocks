require('dotenv').config()
const mysql = require('mysql2')

let pool = null;

const getPool = async () => {
    if(pool) {
        return pool;
    }
    pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
    return pool;
}

getPool();

module.exports = pool;