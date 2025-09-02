// lib/db.js
import mysql from 'mysql2/promise';

let pool;

if (!global.__mysqlPool) {
  pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'school_directory',
    waitForConnections: true,
    connectionLimit: 10,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: true } : undefined,
  });
  global.__mysqlPool = pool;
} else {
  pool = global.__mysqlPool;
}

export default pool;
