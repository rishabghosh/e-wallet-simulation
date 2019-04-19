const mysql = require("mysql");

const CONNECTION = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "xiswalder",
  database: "e_wallet"
});

module.exports = { CONNECTION };
