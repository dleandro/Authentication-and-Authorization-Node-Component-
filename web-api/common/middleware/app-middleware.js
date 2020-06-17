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
        "database": "r15dtqer5c72jvex"
    }

    const jsonObj = {
        "roles": ["admin", "DbManager", "Developer"],
        "permissions": [{ "resource": "users", "action": "GET" }, { "resource": "permissions", "action": "GET" }, { "resource": "roles", "action": "GET" }, { "resource": "roles", "action": "POST" }],
        "grants": { "DbManager": [{ "resource": "users", "action": "GET" }, { "resource": "roles", "action": "GET" }], "admin": [{ "role": "DbManager" }] }
    }

    // using authization module to setup authentication and authorization middleware
    const authization = await require('../../../authization-module/authization')
        .setup(app, db, jsonObj)

    app.use('/api', require("../../web-api")(authization))

}
