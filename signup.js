const { CONNECTION } = require("./databaseConfig");

const addSignUpCredentials = function(req, res) {
  const { username, password, name } = JSON.parse(req.body);
  console.log(JSON.parse(req.body), "------");
  const querryMessage =
    "insert into users (username, password, name, amount)" +
    `values("${username}", "${password}", "${name}", 0)`;
  CONNECTION.query(querryMessage, (err, result) => {
    if (err) {
      console.error("error is ---- \n", err);
      return;
    }
    console.log(result, "*****");
  });
};

module.exports = { addSignUpCredentials };
