const { CONNECTION } = require("./databaseConfig");

const updateAmountToDB = function(req, res) {
  const details = JSON.parse(req.body);

  const queryMessage = `update users set amount=${
    details.newAmount
  } where username = "${details.username}";`;

  CONNECTION.query(queryMessage, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    CONNECTION.query(
      `select amount from users where username = "${details.username}";`,
      (err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(result, "new updated amount is----------");
        res.json(result[0]);
      }
    );
  });
};

const sendCurrentAmount = function(req, res) {
  const { username } = JSON.parse(req.body);
  const queryMessage = `select amount from users where username = "${username}"`;
  CONNECTION.query(queryMessage, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    res.json(result[0]);
  });
};

module.exports = { updateAmountToDB, sendCurrentAmount };
