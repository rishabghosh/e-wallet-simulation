const { CONNECTION } = require("./databaseConfig");

const addSignUpCredentials = function(req, res) {
  const { username, password, name } = JSON.parse(req.body);

  const checkUsername = `select username from users where username = "${username}"`;

  const insertCredentials =
    "insert into users (username, password, name, amount)" +
    `values("${username}", "${password}", "${name}", 0)`;

  CONNECTION.query(checkUsername, (err, result) => {
    if (err) {
      console.error("error while checking username ---- \n", err);
      return;
    }

    if (result.length) {
      res.json({ duplicateUsername: true });
      return;
    }

    CONNECTION.query(insertCredentials, (err, result) => {
      if (err) {
        console.error("error while inserting --- \n", err);
        return;
      }
      console.log(result);
      res.json({ duplicateUsername: false });
    });
  });
};

module.exports = { addSignUpCredentials };
