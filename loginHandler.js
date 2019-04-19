const { CONNECTION } = require("./databaseConfig");

const verifyLoginCredentials = function() {
  const q = "select password from users where username = 'ri7269' ";
  CONNECTION.query(q, (err, result) => {
    if (err) {
      console.error("errror is --", err);
      return;
    }
    console.log(result);
  });
};

module.exports = { verifyLoginCredentials };
