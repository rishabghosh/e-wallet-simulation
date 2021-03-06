const express = require("express");
const bodyParser = require("body-parser");

const { addSignUpCredentials } = require("./signup");
const { verifyLoginCredentials } = require("./loginHandler");
const { handleTransaction, handleAddAmount } = require("./transactions");

const PORT = process.env.PORT || 8080;
const CLIENT_ADDRESS = "/e-wallet-simulation-client/build";

const app = express();

app.use(bodyParser.text());
app.post("/loginCredentials", verifyLoginCredentials);
app.post("/signupCredentials", addSignUpCredentials);
app.post("/add", handleAddAmount);
app.post("/pay", handleTransaction);
app.use(express.static(__dirname + CLIENT_ADDRESS));

app.listen(PORT, () => `server is listening at port ${PORT}`);
