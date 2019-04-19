const mysql = require("mysql");

const CONNECTION = mysql.createConnection({
  host: process.env.HOST || "localhost",
  user: process.env.USER || "root",
  password: process.env.PASSWORD || "xiswalder",
  database: process.env.DATABASE || "e_wallet"
});

module.exports = { CONNECTION };
