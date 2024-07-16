package httpapi.authz

import rego.v1
import data.role_permissions # // import role_permissions from data.json

# // default to not allow
default allow = false

allow if {
    user_role := token.payload.roles[_]
    user_role in role_permissions
}


# Helper to get the token payload.
token := {"payload": payload} if {
	[header, payload, signature] := io.jwt.decode(input.request.query.token)
}