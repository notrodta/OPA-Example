const jwt = require("jsonwebtoken");
const axios = require("axios");

// create a new middleware configured with OPA api server uri
function createOpaMiddleware(opaAgentUri) {
  const client = axios.create({
    baseURL: opaAgentUri,
  });

  return (action, object) => {
    // this will be run per request
    return async (request, response, next) => {
      try {
        // extract request's information from JWT token
        // console.log(request.headers);
        // const token = request.headers.authorization

        // if (!token) {
        //   throw new Error("No authorization header")
        // }

        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlcyI6WyJ1c2VyIl19.LW5pvc1TRaIk3FNaMADQmjx2Hy86weS64WtVdgK1oZk";

        const decodedToken = jwt.decode(token);

        console.log(decodedToken);

        // query OPA api server
        const response = await client.post("/v1/data/httpapi/authz", {
          input: {
            subject: decodedToken,
            action,
            object,
          },
        });

        // OPA api server query's result
        const allow = response.data?.result;
        if (!allow) {
          throw new Error("Unauthorized");
        }

        // authorized
        await next();
      } catch (err) {
        // unauthorized
        response.status(403).send(err.message);
      }
    };
  };
}

module.exports = createOpaMiddleware;
