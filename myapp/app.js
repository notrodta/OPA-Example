const express = require("express");
const axios = require("axios");
const bodyParser = require('body-parser');
const extAuthz = require('@build-security/opa-express-middleware');

const app = express();
const port = 3000;

const opa_url = "http://opa:8181";
const policy_path = "/v1/data/httpapi/authz";

const url = opa_url + policy_path;

const access_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlcyI6WyJ1c2VyIl19.LW5pvc1TRaIk3FNaMADQmjx2Hy86weS64WtVdgK1oZk";

  const extAuthzMiddleware = extAuthz.authorize((req) => ({
    port: 8181,
    hostname: 'http://opa',
    policyPath: 'httpapi/authz/allow',
    // enable: req.method === "GET",
    // enrich: { serviceId: 1 }
}));

app.use(bodyParser.json());

app.get('/region/:region/users/:userId', extAuthz.permissions('update', 'delete', 'read'), extAuthzMiddleware, (req, res) => {
    res.send('allowed');
});


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
