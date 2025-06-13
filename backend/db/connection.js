const mysql = require('mysql2');
require('dotenv').config();

// Lager en pool av tilkoblinger for å håndtere flere forespørsler og reconnects
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  database: process.env.DB_NAME || 'proyecto',
  password: process.env.DB_PASSWORD || '',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Valgfritt: test om tilkoblingen virker
pool.getConnection((err, connection) => {
  if (err) {
    console.error(' MySQL-connection error:', err.message);
  } else {
    console.log('Connected MySql with pool');
    connection.release();
  }
});

module.exports = pool;



/*
const mysql = require('mysql2');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
};

let connection;

function connectWithRetry() {
  connection = mysql.createConnection(dbConfig);

  connection.connect(err => {
    if (err) {
      console.error('MySQL connection failed. Retrying in 4 seconds...');
      setTimeout(connectWithRetry, 4000);
    } else {
      console.log('Conectado a la base de datos MySQL');
    }
  });
}

connectWithRetry();

module.exports = connection; 
*/
