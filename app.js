const express = require("express");
const bodyParser = require("body-parser");

const { verifyLoginCredentials } = require("./loginHandler");
const { updateAmountToDB } = require("./transactions");

const PORT = process.env.PORT || 8080;
const CLIENT_ADDRESS = "/e-wallet-simulation-client/build";

const app = express();

app.use(bodyParser.text());
app.post("/loginCredentials", verifyLoginCredentials);
app.post("/updateAmount", updateAmountToDB);
app.use(express.static(__dirname + CLIENT_ADDRESS));

app.listen(PORT, () => `server is listening at port ${PORT}`);
