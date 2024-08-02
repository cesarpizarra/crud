const connection = require("../database/connection.js");
class User {
  // Get all users
  async getAllUsers() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM users", (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
}

module.exports = new User();
