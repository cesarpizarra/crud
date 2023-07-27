const connection = require("../database/connection");

const updateConnection = async (id, username, password) => {
  try {
    const query =
      `UPDATE ` +
      `users ` +
      `SET ` +
      `username = '${username}', ` +
      `password = '${password}' ` +
      `WHERE ` +
      `id = ${id}`;

    await connection(query);

    return true;
  } catch (err) {
    return false;
  }
};

module.exports = updateConnection;
