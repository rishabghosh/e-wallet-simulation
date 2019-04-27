const { CONNECTION } = require("./databaseConfig");
const queryMessage = require("./querry");
const { handleQuery } = require("./utils");

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

const handleTransaction = function(req, res) {
  const { usernameOfReceiver, payAmount } = JSON.parse(req.body);
  const requestAmount = queryMessage.requestAmount(usernameOfReceiver);

  CONNECTION.query(requestAmount, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    const { amount } = result[0];
    const newAmount = amount + +payAmount;
    const setAmount = queryMessage.updateAmount(newAmount, usernameOfReceiver);

    const doNothing = () => {};
    CONNECTION.query(setAmount, handleQuery.bind(null, doNothing));
  });
};

module.exports = { updateAmountToDB, sendCurrentAmount, handleTransaction };
