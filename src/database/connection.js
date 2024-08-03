const mysql = require('mysql');
require('dotenv').config();
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: process.env.PASSWORD,
  port: 3306,
  database: 'employees',
};

const dbConnection = mysql.createConnection(dbConfig);
dbConnection.connect((err) => {
  if (err) {
    console.err('Error connecting to database', err);
  } else {
    console.log('Connected to database.');
  }
});

module.exports = dbConnection;
