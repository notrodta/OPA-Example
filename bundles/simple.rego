# // simple.rego
package httpapi.authz
import data.role_permissions # // import role_permissions from data.json
import data.admin


allow = true {
    print("simple");
    print(token)
    print(role_permissions)
    print(admin)
    print("simple end");
    token.payload.name == "foo bar"
}