'use strict'

const
    morgan = require('morgan')

// This module is used to setup middleware on the app passed as a parameter
module.exports = async function (app) {

    // app configurations

    // For request logging
    app.use(morgan('tiny'))

    const db = {
        "host": "eporqep6b4b8ql12.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
        "port": 3306,
        "user": "jvp56pl2nbv1v9pw",
        "password": "pv9t6oy23bsv65ri",
        "connectionLimit": 5,
        "database": "r15dtqer5c72jvex",
        "sgbd": "mariadb"
    }

    const jsonObj = {
        "roles": ["admin", "DbManager", "Developer","guest"],
        "permissions": [{ "resource": "authentications", "action": "GET" },{ "resource": "authentications", "action": "POST" },{ "resource": "users", "action": "GET" }, { "resource": "permissions", "action": "GET" }, { "resource": "roles", "action": "GET" }, { "resource": "roles", "action": "POST" }, { "resource": "lists", "action": "GET" }],
        "grants": { "DbManager": [{ "resource": "users", "action": "GET" }, { "resource": "roles", "action": "GET" }],"guest":[{ "resource": "authentications", "action": "GET" },{ "resource": "authentications", "action": "POST" }],"admin": [{ "role": "DbManager" },{ "role": "guest" },{ "resource": "permissions", "action": "GET" },{ "resource": "lists", "action": "GET" }]}
    }

    // using authization module to setup authentication and authorization middleware
    const authization = await require('../../../authization-module/authization')
        .setup(app, db, jsonObj)

    app.use('/api', require("../../web-api")(authization))

}
