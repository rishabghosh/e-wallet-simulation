const { CONNECTION } = require("./databaseConfig");

const verifyLoginCredentials = function(req, res) {
  const details = JSON.parse(req.body);
  console.log(details);

  const q = `select password from users where username = '${
    details.username
  }'; `;

  CONNECTION.query(q, (err, result) => {
    if (err) {
      console.error("errror is --", err);
      return;
    }
    console.log("no error found in first querry");

    if (result[0] && details.password === result[0].password) {
      console.log("correct username and password");
      const queryMessage = `select name, amount from users where username = '${
        details.username
      }'; `;
      CONNECTION.query(queryMessage, (err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(result, "---");
        res.json(result);
      });
      return;
    }
    console.log("incorrect username or password");
    res.json({ incorrectCredentials: true });
  });
};

module.exports = { verifyLoginCredentials };
