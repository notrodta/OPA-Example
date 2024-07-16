# // simple.rego
package httpapi.authz


allow = true {
    print("simple");
    print(token)
    print("simple end");
    token.payload.name == "foo bar"
}