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
  const { username, usernameOfReceiver, payAmount } = JSON.parse(req.body);
  const requestAmountOfSender = queryMessage.requestAmount(username);
  const requestAmountOfReceiver = queryMessage.requestAmount(
    usernameOfReceiver
  );

  CONNECTION.query(requestAmountOfSender, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    const { amount } = result[0];
    const newAmountOfSender = amount - +payAmount;
    if (newAmountOfSender < 0) {
      res.json({ failed: true });
      return;
    }
    const setAmountOfSender = queryMessage.updateAmount(
      newAmountOfSender,
      username
    );
    const doNothing = () => {};
    CONNECTION.query(setAmountOfSender, handleQuery.bind(null, doNothing));

    CONNECTION.query(requestAmountOfReceiver, (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      const { amount } = result[0];
      const newAmountOfReceiver = amount + +payAmount;
      const setAmountOfReceiver = queryMessage.updateAmount(
        newAmountOfReceiver,
        usernameOfReceiver
      );
      CONNECTION.query(setAmountOfReceiver, (err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        CONNECTION.query(requestAmountOfSender, (err, result) => {
          if (err) {
            console.error(err);
            return;
          }
          res.json(result[0]);
        });
      });
    });
  });
};

const updateAmount = function(username, addedAmount) {
  const requestAmount = queryMessage.requestAmount(username);

  CONNECTION.query(requestAmount, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    const { amount } = result[0];
    const newAmount = addedAmount + amount;
    const setAmount = queryMessage.updateAmount(newAmount, username);

    CONNECTION.query(setAmount, (err, result) => {});
  });
};

module.exports = { updateAmountToDB, sendCurrentAmount, handleTransaction };
