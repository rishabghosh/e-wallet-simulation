const { CONNECTION } = require("./databaseConfig");
const queryMessage = require("./querry.js");
const { handleQuery } = require("./utils");

const addSignUpCredentials = function(req, res) {
  const { username, password, name } = JSON.parse(req.body);
  const checkUsernameMessage = queryMessage.checkUsername(username);
  const insertCredentialsMessage = queryMessage.insertCredentials(
    username,
    password,
    name
  );

  const sendAvailability = function(result) {
    const sendAvailable = function() {
      res.json({ duplicateUsername: false });
    };

    if (result.length) {
      res.json({ duplicateUsername: true });
      return;
    }

    CONNECTION.query(
      insertCredentialsMessage,
      handleQuery.bind(null, sendAvailable)
    );
  };

  CONNECTION.query(
    checkUsernameMessage,
    handleQuery.bind(null, sendAvailability)
  );
};

module.exports = { addSignUpCredentials };
