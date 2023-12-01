// config.js
const mysql = require("mysql");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "your_mysql_password",
  database: "travel",
};

const pool = mysql.createPool(dbConfig);

module.exports = pool;
