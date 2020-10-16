require('dotenv').config()

var mysql = require('mysql');

var connection;
if (process.env.JAWSDB_URL) {
    // Database is JawsDB on Heroku
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    // Database is local
    connection = mysql.createConnection({
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: 'weedmates_db',
      host: process.env.DB_HOST,
      dialect: 'mysql'
    })
};
