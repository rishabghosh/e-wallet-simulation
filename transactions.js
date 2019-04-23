const { CONNECTION } = require("./databaseConfig");
const queryMessage = require("./querry");

const handleQuery = function(next, err, result) {
  if (err) {
    console.error(err);
    return;
  }
  next(result);
};

const updateAmountToDB = function(req, res) {
  const { newAmount, username } = JSON.parse(req.body);
  const updateAmountMessage = queryMessage.updateAmount(newAmount, username);
  const requestAmountMessage = queryMessage.requestAmount(username);

  const sendAmount = function(result) {
    res.json(result[0]);
  };

  const updateAmount = function() {
    CONNECTION.query(requestAmountMessage, handleQuery.bind(null, sendAmount));
  };

  CONNECTION.query(updateAmountMessage, handleQuery.bind(null, updateAmount));
};



const sendCurrentAmount = function(req, res) {
  const { username } = JSON.parse(req.body);
  const requestAmountMessage = queryMessage.requestAmount(username);

  const sendAmount = function(result) {
    res.json(result[0]);
  };

  CONNECTION.query(requestAmountMessage, handleQuery.bind(null, sendAmount));
};

module.exports = { updateAmountToDB, sendCurrentAmount };
