const connection = require("../database/connection");

const deleteAccount = async (id) => {
  try {
    const query = `DELETE FROM ` + `users ` + `WHERE ` + `id = ${id}`;

    await connection(query);

    return true;
  } catch (err) {
    return false;
  }
};

module.exports = deleteAccount;
