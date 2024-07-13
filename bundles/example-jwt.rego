package httpapi.authz

import rego.v1

default allow := false

# Allow users to get their own salaries.
allow if {
	some username
	input.method == "GET"
	input.path = ["finance", "salary", username]
	token.payload.user == username
	user_owns_token
}

# Allow managers to get their subordinate' salaries.
allow if {
	some username
	input.method == "GET"
	input.path = ["finance", "salary", username]
	token.payload.subordinates[_] == username
	user_owns_token
}

# Allow HR members to get anyone's salary.
allow if {
	input.method == "GET"
	input.path = ["finance", "salary", _]
	token.payload.hr == true
	user_owns_token
}

# Ensure that the token was issued to the user supplying it.
user_owns_token if input.user == token.payload.azp

# Helper to get the token payload.
token := {"payload": payload} if {
	[header, payload, signature] := io.jwt.decode(input.token)
}