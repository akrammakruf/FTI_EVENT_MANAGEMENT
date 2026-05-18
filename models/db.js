const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'db_event_management'
});

db.connect((err) => {
  if (err) return console.error('Koneksi database gagal:', err.message);

  console.log('Koneksi database berhasil.');
  console.log('Database aktif:', process.env.DB_NAME);
});

module.exports = db;