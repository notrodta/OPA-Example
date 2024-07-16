package httpapi.authz

import rego.v1
import data.role_permissions # // import role_permissions from data.json

# // default to not allow
default allow = false

allow if {
    print(input)
    print("permission");
    print(role_permissions)
    print(input.request.path)
    print(input.resources.attributes)
    print(role_permissions)
    permission := role_permissions[_]
    print("permission start")
    print(input.resources.permissions)
    print(permission)
    print("permission start")
    permission == input.resources.permissions[0]
    # role := input.subject.roles[_] # // for every input roles
    # permissions := role_permissions[role] # // get permission of the role
    # permission := permissions[_] # // for every permission
    # print("list permission start")
    # print(permission)
    # print("list permission start")
    # permission == {"action": input.action, "object": input.object} # // allow = true when input action and object matches
}