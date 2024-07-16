const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const extAuthz = require("@build-security/opa-express-middleware");

const app = express();
const port = 3000;

const extAuthzMiddleware = extAuthz.authorize((req) => ({
  port: 8181,
  hostname: "http://opa",
  policyPath: "httpapi/authz/allow",
  // enable: req.method === "GET",
  // enrich: { serviceId: 1 }
}));

app.use(bodyParser.json());

app.get("/region/:region/users/:userId", extAuthzMiddleware, (req, res) => {
  res.send("allowed");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
