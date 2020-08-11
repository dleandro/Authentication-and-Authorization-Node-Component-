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

const rbac_opts = {
    "roles": ["admin", "DbManager", "Developer", "guest"],
    "permissions": [
        { "resource": "users-lists", "action": "GET" },
        { "resource": "users-lists", "action": "POST" },
        { "resource": "users-lists", "action": "PUT" },
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
        { "resource": "authentications", "action": "GET" },
        { "resource": "authentications", "action": "POST" },
        { "resource": "authentications", "action": "PUT" },
        { "resource": "authentications", "action": "DELETE" }
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
            { "resource": "configs", "action": "GET" }
        ]
    }
}

exports.db2 = db2
exports.db = db
exports.rbac_opts = rbac_opts
exports.cloud_db = cloud_db
