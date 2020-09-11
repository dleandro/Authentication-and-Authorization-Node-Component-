const db2 = {
    "host": "localhost",
    "port": "5432",
    "user": "postgres",
    "password": "1234",
    "connectionLimit": 5,
    "database": "postgres",
    "dbms": "postgres"
}

const db = {
    "host": "eporqep6b4b8ql12.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
    "port": 3306,
    "user": "jvp56pl2nbv1v9pw",
    "password": "pv9t6oy23bsv65ri",
    "connectionLimit": 5,
    "database": "r15dtqer5c72jvex",
    "dbms": "mariadb"
}

const cloud_db={
    "host": "35.197.222.252",
    "port": 3306,
    "user": "authization",
    "password": "hwwuq1PAAmmejOEk",
    "connectionLimit": 5,
    "database": "authization",
    "dbms": "mysql"
}

const strategies={
    "google_oauth2": {
      "client_id": "523982739771-2hkfdqls3uapvlf0c111i6qhnidfgt44.apps.googleusercontent.com",
      "client_secret": "vs0R8tvgMv2w2rhuHtRPT9nK",
      "callbackUrl": "http://localhost:8080/api/authentications/google/callback"
    },
    "office365_oauth2": {
      "client_id": "39d62b3c-b736-4e13-b71e-37926569e5dc",
      "client_secret": "8i4IoQXtI-UbSc5wz4LtrO:=M:UrkTH=",
      "callbackUrl": "http://localhost:8080/api/authentications/azureAD/callback",
      "tenant": "bb367ab9-9da9-455e-b938-fd65cd29f5ae"
    },
    "office365_saml": {
      "callbackUrl": "http://localhost:8080/api/authentications/saml/callback",
      "entryPoint": "https://login.microsoftonline.com/bb367ab9-9da9-455e-b938-fd65cd29f5ae/saml2",
      "issuer": "51ca8d6f-0e88-4e3c-9e49-ae2920ef2c46",
      "certificate":"MIIC8DCCAdigAwIBAgIQHsZCEG1T/p5BDiFviQA4VTANBgkqhkiG9w0BAQsFADA0MTIwMAYDVQQDEylNaWNyb3NvZnQgQXp1cmUgRmVkZXJhdGVkIFNTTyBDZXJ0aWZpY2F0ZTAeFw0yMDA3MTAxNjE1MDRaFw0yMzA3MTAxNjE1MDRaMDQxMjAwBgNVBAMTKU1pY3Jvc29mdCBBenVyZSBGZWRlcmF0ZWQgU1NPIENlcnRpZmljYXRlMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2+qKxsTAwGkDGZDg3x/dm9e5yV4lWUawei9niHydgKwExz6mFoHkYm3U1aGl6MSoXN2BXVCT1Yd7BAQQWK4XymTz/YsSXPUNvYn4vszMCXu6hP+Z0Pmeuj7LNCOPFA6sHNkvmhciXFi68eQNg6nuKqkLLIyAjHMyaveiVbcBly6bSIkQ/2iB5BweDZnW4g/jy7pJelXNIhLNaeOuvogm1urwJed8kFBaI5xhMhLKfEPvOgwZlZPXq38Ie6pLMDVjh8HohKcsh4DoWrxfQzUh/tvgwMhqUP1D5bvrTEw7pzGDdmgOIVUsEuYDI8d2kwgNfxUSIw4arYncWhJrwLvPLQIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQCP9jsaY6zF26uGQeDjgrTtZ0SD8LlsO58ROYIL+jDRJvmk3bTWTiRRB6NjV4zoOJva64GJPH7A98A59QYR9enbvFm2q7odzB28V8iym5X4MJ/qeL6R6iiQk9+jeczurAhocsledoWXG89zNa1HlcUhZ66XZo2lZG5vnX/YI6af0UY0TNCF8zoqk8HsQxCP6Q34qsyNsh35WeU77/hKp8zD+oZG1fl1aGsEtIRHDiyFjSSAeRfFgPRY8CK8nDEVKFVYyvyceQLKpqY1saaTMWnwtjha8F0Z8ZQNNq/gG0NnQF8KoZSJKrZF4qnXALu7jjAnZDwEUNSkyF+gFPrJOOtj"
    }
  }

const rbac_opts = {
    "roles": ["admin", "DbManager", "Developer", "guest","Colaborator"],
    "permissions": [
        { "resource": "profile", "action": "POST" },
        { "resource": "profile", "action": "GET" },
        { "resource": "profile", "action": "PUT" },
        { "resource": "profile", "action": "DELETE" },
        { "resource": "users-lists", "action": "GET" },
        { "resource": "users-lists", "action": "POST" },
        { "resource": "users-lists", "action": "PUT" },
        { "resource": "users-lists", "action": "PATCH" },
        { "resource": "users-lists", "action": "DELETE" },
        { "resource": "auth-types", "action": "GET" },
        { "resource": "auth-types", "action": "POST" },
        { "resource": "auth-types", "action": "PATCH" },
        { "resource": "auth-types", "action": "DELETE" },
        { "resource": "permissions", "action": "GET" },
        { "resource": "permissions", "action": "POST" },
        { "resource": "permissions", "action": "PUT" },
        { "resource": "permissions", "action": "DELETE" },
        { "resource": "roles", "action": "GET" },
        { "resource": "roles", "action": "POST" },
        { "resource": "roles", "action": "PUT" },
        { "resource": "roles", "action": "DELETE" },
        { "resource": "configs", "action": "GET" },
        { "resource": "configs", "action": "POST" },
        { "resource": "configs", "action": "PUT" },
        { "resource": "configs", "action": "DELETE" },
        { "resource": "users", "action": "GET" },
        { "resource": "users", "action": "POST" },
        { "resource": "users", "action": "PUT" },
        { "resource": "users", "action": "DELETE" },
        { "resource": "sessions", "action": "GET" },
          { "resource": "sessions", "action": "POST" },
          { "resource": "sessions", "action": "PUT" },
          { "resource": "sessions", "action": "DELETE" },
          { "resource": "lists", "action": "GET" },
          { "resource": "lists", "action": "POST" },
          { "resource": "lists", "action": "PUT" },
          { "resource": "lists", "action": "DELETE" },
          { "resource": "roles-permissions", "action": "GET" },
          { "resource": "roles-permissions", "action": "POST" },
          { "resource": "roles-permissions", "action": "PUT" },
          { "resource": "roles-permissions", "action": "DELETE" },
          { "resource": "users-roles", "action": "GET" },
          { "resource": "users-roles", "action": "POST" },
          { "resource": "users-roles", "action": "PUT" },
          { "resource": "users-roles", "action": "DELETE" },
          { "resource": "users-roles", "action": "PATCH" },
        { "resource": "authentications", "action": "GET" },
        { "resource": "authentications", "action": "POST" },
        { "resource": "authentications", "action": "PUT" },
        { "resource": "authentications", "action": "DELETE" },

    ],
    "grants": {
        "DbManager": [
            { "resource": "users", "action": "DELETE" },
            { "resource": "users", "action": "GET" },
            { "resource": "users", "action": "POST" },
            { "resource": "users", "action": "PUT" },
        ],
        "guest": [
            { "resource": "auth-types", "action": "GET" },
            { "resource": "authentications", "action": "GET" },
            { "resource": "authentications", "action": "POST" },
            { "resource": "users", "action": "POST" },
            { "resource": "configs", "action": "GET" },
        ],
        "Colaborator":[
            { "resource": "profile", "action": "POST" },
            { "resource": "profile", "action": "PUT" },
            { "resource": "profile", "action": "GET" },
            { "resource": "profile", "action": "DELETE" },
            { "resource": "configs", "action": "GET" },
            { "resource": "auth-types", "action": "GET" },
            { "resource": "authentications", "action": "GET" },
            { "resource": "authentications", "action": "POST" },
        ]
    }
}

exports.db2 = db2;
exports.db = db;
exports.rbac_opts = rbac_opts;
exports.cloud_db = cloud_db;
exports.strategies=strategies;
