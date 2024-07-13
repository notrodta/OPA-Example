package httpapi.authz

import rego.v1

# Allow HR members to get anyone's salary.
allow if {
	input.method == "GET"
	input.path = ["finance", "salary", _]
	input.user == hr[_]
}

# David is the only member of HR.
hr := ["david"]