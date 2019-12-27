const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config(); // load .env file
const signature = require("./verifySignature");
const { redCmd } = require("./redCommand");

const app = express();

const rawBodyBuffer = (req, res, buf, encoding) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || "utf8");
  }
};

app.use(
  bodyParser.urlencoded({
    verify: rawBodyBuffer,
    extended: true
  })
);
app.use(
  bodyParser.json({
    verify: rawBodyBuffer
  })
);

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(
    "Express server listening on port %d in %s mode",
    server.address().port,
    app.settings.env
  );
});

/*
 * Slash Command Endpoint to receive a payload
 */
// エアコンの除湿をONにする
app.post("/aird", async (req, res) => {
  // failed authentification
  if (!signature.isVerified(req)) {
    res.sendStatus(404); // You may throw 401 or 403, but why not just giving 404 to malicious attackers
    return;
  }

  // send back an HTTP response with data
  redCmd("./data/ch0.data");
  const message = {
    response_type: "in_channel",
    text: "エアコンの除湿をONにしました。"
  };
  res.json(message);
});

// エアコンの冷房をONにする
app.post("/airc", async (req, res) => {
  // failed authentification
  if (!signature.isVerified(req)) {
    res.sendStatus(404); // You may throw 401 or 403, but why not just giving 404 to malicious attackers
    return;
  }

  // send back an HTTP response with data
  redCmd("./data/ch1.data");
  const message = {
    response_type: "in_channel",
    text: "エアコンの冷房をONにしました。"
  };
  res.json(message);
});

// エアコンの暖房をONにする
app.post("/airw", async (req, res) => {
  // failed authentification
  if (!signature.isVerified(req)) {
    res.sendStatus(404); // You may throw 401 or 403, but why not just giving 404 to malicious attackers
    return;
  }

  // send back an HTTP response with data
  redCmd("./data/ch2.data");
  const message = {
    response_type: "in_channel",
    text: "エアコンの暖房をONにしました。"
  };
  res.json(message);
});

// エアコンをOFFにする
app.post("/stop", async (req, res) => {
  // failed authentification
  if (!signature.isVerified(req)) {
    res.sendStatus(404); // You may throw 401 or 403, but why not just giving 404 to malicious attackers
    return;
  }

  // send back an HTTP response with data
  redCmd("./data/ch3.data");
  const message = {
    response_type: "in_channel",
    text: "エアコンをOFFにしました。"
  };
  res.json(message);
});
