const connection = require("../database/connection");

const retrieveAccount = async (fields) => {
  try {
    const query = `SELECT ` + `${fields} ` + `FROM ` + `users`;

    const results = await connection(query);

    return results;
  } catch (err) {
    return [];
  }
};

module.exports = retrieveAccount;
