const mysql = require("mysql");

// dbConnection.connect((err) => {
//     if (err) {
//       console.log("Connection error:", err);
//     } else {
//       dbConnection.query(`SELECT * FROM users`, (err, results, fields) => {
//         console.log("Error", err);
//         console.log("Results", results);
//         console.log("Fields", fields);
//       });
//     }
//   });

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "12345",
  port: 3306,
  database: "nodejs-mysql",
};

const dbConnection = mysql.createPool(dbConfig);

module.exports = (query) => {
  return new Promise((resolve, reject) => {
    dbConnection.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        connection.query(query, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
          connection.release();
        });
      }
    });
  });
};
