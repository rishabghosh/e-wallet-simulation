const { CONNECTION } = require("./databaseConfig");

const updateAmountToDB = function(req, res) {
  const details = JSON.parse(req.body);
  console.log(details)

  const queryMessage = `update users set amount=${
    details.newAmount
  } where username = "${details.username}";`;

  CONNECTION.query(queryMessage, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(result);
  });
};

module.exports = { updateAmountToDB };
