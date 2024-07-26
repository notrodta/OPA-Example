const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const extAuthz = require("@build-security/opa-express-middleware");

const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));

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

app.get("/express-server", async (req, res) => {
  // const response = await fetch('http://localhost:4000/');
  const response = await fetch('http://host.docker.internal:4000/');
  const data = await response.json();
  console.log(data);
  res.send(data);
  // res.send('hellow from express api');
});


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
