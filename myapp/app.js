const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

// const opa_url = "http://localhost:8181";
const opa_url = "http://opa:8181";
// const opa_url = "http://127.0.0.1:8181";
const policy_path = "/v1/data/httpapi/authz";

const url = opa_url + policy_path;

// check to see if bob can see alice salary
app.get("/finance/salary/alice", async function (req, res) {
  try {
    const response  = await axios.post(url, {
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
