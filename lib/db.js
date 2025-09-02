// lib/db.js
import mysql from 'mysql2/promise';

let pool;

if (!global.__mysqlPool) {
  // Ensure required env variables exist
  const {
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_SSL,
  } = process.env;

  if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME) {
    throw new Error(
      'Database environment variables are missing. Please set DB_HOST, DB_USER, DB_PASSWORD, DB_NAME.'
    );
  }

  pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT ? Number(DB_PORT) : 3306,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  ssl:
    DB_SSL === 'true'
      ? {
          rejectUnauthorized: false, // important for self-signed cert
        }
      : undefined,
});


  global.__mysqlPool = pool;
} else {
  pool = global.__mysqlPool;
}

export default pool;
