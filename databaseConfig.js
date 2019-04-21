const mysql = require("mysql");

const CONNECTION = mysql.createConnection({
  host: process.env.HOST, //loacahost
  user: process.env.USER, //root
  password: process.env.PASSWORD, //xiswalder
  database: process.env.DATABASE_NAME //e_wallet
});

module.exports = { CONNECTION };
