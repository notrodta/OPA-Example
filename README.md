# OPA-Example

reference: https://pongzt.com/post/opa-nodejs/


build policy: opa build simple.rego permission.rego data.json
in bundle directory: opa build ../bundles  


try this endpoint: http://localhost:3000/region/israel/users/buildsec?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlcyI6WyJkZWxldGUiLCJ3cml0ZSIsImFkbWluIl19.0FCORUheMA4-yWb4agGtnq9zrK0IoOIsEA2m37gZfMQ

____________________

To test connection between docker container and localhost
1. Run service app locally: node app.js
2. Run docker-compose build
3. Run docker-compose up

`myapp` should be able to call out to API in the express app in `service`