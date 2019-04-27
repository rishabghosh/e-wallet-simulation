const { CONNECTION } = require("./databaseConfig");
const queryMessage = require("./querry");
const { handleQuery } = require("./utils");

const doNothing = () => {};

const query = function(message, next = doNothing) {
  CONNECTION.query(message, handleQuery.bind(null, next));
};

const handleTransaction = function(req, res) {
  const { username, usernameOfReceiver, payAmount } = JSON.parse(req.body);
  const requestAmountOfSender = queryMessage.requestAmount(username);
  const requestAmountOfReceiver = queryMessage.requestAmount(
    usernameOfReceiver
  );

  const sendAmount = function(result) {
    res.json(result[0]);
  };

  const sendAmountOfSender = function(result) {
    CONNECTION.query(requestAmountOfSender, handleQuery.bind(null, sendAmount));
  };

  const updateAmountOfReceiver = function(result) {
    const { amount } = result[0];
    const newAmountOfReceiver = amount + +payAmount;
    const updateAmountMessage = queryMessage.updateAmount(
      newAmountOfReceiver,
      usernameOfReceiver
    );

    query(updateAmountMessage, sendAmountOfSender);
  };

  const payIfValid = function(result) {
    const { amount } = result[0];
    const newAmount = amount - +payAmount;

    if (newAmount < 0) {
      res.json({ failed: true });
      return;
    }

    const setAmount = queryMessage.updateAmount(newAmount, username);

    query(setAmount);
    query(requestAmountOfReceiver, updateAmountOfReceiver);
  };

  query(requestAmountOfSender, payIfValid);
};

const handleAddAmount = function(req, res) {
  const { username, addedAmount } = JSON.parse(req.body);
  const requestAmountMessage = queryMessage.requestAmount(username);

  const sendAmount = function(result) {
    res.json(result[0]);
  };

  const requestAmount = function() {
    query(requestAmountMessage, sendAmount);
  };

  const updateAmountIfValid = function(result) {
    const { amount } = result[0];
    console.log(addedAmount);
    if (!addedAmount || addedAmount < 0) {
      res.json({ invalid: true });
      return;
    }
    const newAmount = amount + addedAmount;
    const updateAmountMessage = queryMessage.updateAmount(newAmount, username);
    query(updateAmountMessage, requestAmount);
  };

  query(requestAmountMessage, updateAmountIfValid);
};

module.exports = { handleTransaction, handleAddAmount };
