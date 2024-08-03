const connection = require('../database/connection.js');
class User {
  // Get all users
  async find() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users';
      connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  // Get user by id
  async findById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE id = ?';
      connection.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  // Create User
  async create(username, password) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
      const values = [username, password];
      connection.query(query, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  //  Delete user
  async delete(id) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM users WHERE id = ?';
      connection.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  // Update User
  async update(username, password, id) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE users SET username = ?, password = ? WHERE id = ?';
      const values = [username, password, id];
      connection.query(query, values, (err, results) => {
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
