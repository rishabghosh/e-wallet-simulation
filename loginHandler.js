const { CONNECTION } = require("./databaseConfig");

const verifyLoginCredentials = function(req, res) {
  const details = JSON.parse(req.body);

  const q = `select password from users where username = '${
    details.username
  }'; `;

  CONNECTION.query(q, (err, result) => {
    if (err) {
      console.error("errror is --", err);
      return;
    }
    
    //should update and quried from database
    if (result[0] && details.password === result[0].password) {
      const queryMessage = `select name, amount from users where username = '${
        details.username
      }'; `;

      CONNECTION.query(queryMessage, (err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        res.json(result);
      });
      return;
    }
    res.json({ incorrectCredentials: true });
  });
};

module.exports = { verifyLoginCredentials };
