const { CONNECTION } = require("./databaseConfig");
const queryMessage = require("./querry");
const { handleQuery } = require("./utils");

const verifyLoginCredentials = function(req, res) {
  const { username, password } = JSON.parse(req.body);
  const requestPassword = queryMessage.requestPassword(username);
  const queryProfileDetails = queryMessage.queryProfileDetails(username);

  const sendResult = result => {
    res.json(result);
  };

  const getProfile = function(result) {
    if (result[0] && password === result[0].password) {
      CONNECTION.query(queryProfileDetails, handleQuery.bind(null, sendResult));
      return;
    }
    res.json({ incorrectCredentials: true });
  };

  CONNECTION.query(requestPassword, handleQuery.bind(null, getProfile));
};

module.exports = { verifyLoginCredentials };
