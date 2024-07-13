// const express = require("express");
// const bodyParser = require("body-parser");
// const extAuthz = require("@build-security/opa-express-middleware");

// const app = express();
// const jsonParserMiddleware = bodyParser.json();
// const extAuthzMiddleware = extAuthz.authorize((req) => ({
//   port: 8181,
//   hostname: "http://localhost",
//   policyPath: "/authz/allow",

//   enable: req.method === "GET",
//   enrich: { serviceId: 1 },
// }));

// // Add the extAuthzMiddleware here to apply to all requests.
// // This has one drawback: route parameters will not be available
// // to the authz policy as input.
// app.use(jsonParserMiddleware);

// // Applying the middleware per route makes the route parameters "region" and "userId"
// // available to the authz policy as input.
// app.get(
//   "/region/:region/users/:userId",
//   extAuthz.permissions("user.read"),
//   extAuthzMiddleware,
//   (req, res) => {
//     res.send("allowed");
//   }
// );

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// const port = 3000;
// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });


const express = require('express')
const app = express()
const port = 3000

const opa_url = "http://localhost:8181";
const policy_path = "/v1/data/httpapi/authz";

const url = opa_url + policy_path;

app.get("/finance/salary/alice", async function (req, res) {
    const options = {
        method: "POST",
        header: {
            Accept: "appliction/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            method: "GET",
            path: ["finance", "salary", "alice"],
            user: "bob"
        })
    };

    try {
        let response = await fetch(url, options);
        response = await response.json();
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Internal Server Error...' });
    }
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})