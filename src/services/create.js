const connection = require("../database/connection");

const createAccount = async (username, password) => {
  try {
    const query =
      `INSERT INTO ` +
      `users ` +
      `VALUES ` +
      `(null, '${username}','${password}')`;
    connection(query);
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = createAccount;
