const express = require("express");
const axios = require("axios");
const createOpaMiddleware = require("./opa");

const app = express();
const port = 3000;

// const opa_url = "http://localhost:8181";
const opa_url = "http://opa:8181";
// const opa_url = "http://127.0.0.1:8181";
const policy_path = "/v1/data/httpapi/authz";

const url = opa_url + policy_path;

const access_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlcyI6WyJ1c2VyIl19.LW5pvc1TRaIk3FNaMADQmjx2Hy86weS64WtVdgK1oZk";

const hasPermission = createOpaMiddleware("http://opa:8181");

// check if the request is allowed to take action "read" to object "order"
app.get("/orders/:id", hasPermission("read", "order"),  (req, res) => {
  res.json({ message: `you can read order with id ${req.params.id}` });
});

// check if the request is allowed to take action "create" to object "order"
app.post("/orders", hasPermission("create", "order"), (req, res) => {
  res.json({ message: `you can create order` });
});

// check to see if bob can see alice salary
app.get("/finance/salary/alice", async function (req, res) {
  try {
    const response = await axios.post(url, {
      input: {
        method: "GET",
        path: ["finance", "salary", "alice"],
        user: "bob",
      },
    });
    res.status(200).json({ data: response.data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error..." });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
