// database.js

const mysql = require('mysql2');

// Buat koneksi ke database
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: '127.0.0.1', // Gantilah dengan nama pengguna MySQL Anda
  password: '', // Gantilah dengan kata sandi MySQL Anda
  database: 'travel',
});

// Lakukan koneksi ke database
connection.connect(error => {
  if (error) {
    console.error('Error connecting to MySQL database:', error);
  } else {
    console.log('Connected to MySQL database');
  }
});

module.exports = connection;
