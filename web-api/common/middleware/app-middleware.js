'use strict'

const
    morgan = require('morgan'),
    apiUtils=require('../util/api-utils')

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
        "permissions": [{ "resource": "roles", "action": "DELETE" },{ "resource": "roles", "action": "PUT" },{ "resource": "permissions", "action": "DELETE" },{ "resource": "permissions", "action": "POST" },{ "resource": "permissions", "action": "PUT" },{ "resource": "users", "action": "PUT" },{ "resource": "users", "action": "DELETE" },{ "resource": "authentications", "action": "GET" },{ "resource": "authentications", "action": "POST" },{ "resource": "users", "action": "GET" }, { "resource": "permissions", "action": "GET" }, { "resource": "roles", "action": "GET" }, { "resource": "roles", "action": "POST" }, { "resource": "lists", "action": "GET" },{ "resource": "users", "action": "POST" }],
        "grants": { "DbManager": [{ "resource": "roles", "action": "DELETE" },{ "resource": "roles", "action": "PUT" },{ "resource": "permissions", "action": "POST" },{ "resource": "permissions", "action": "DELETE" },{ "resource": "permissions", "action": "PUT" },{ "resource": "users", "action": "GET" }, { "resource": "roles", "action": "GET" },{ "resource": "users", "action": "PUT" },{ "resource": "users", "action": "DELETE" }],"guest":[{ "resource": "authentications", "action": "GET" },{ "resource": "authentications", "action": "POST" },{ "resource": "users", "action": "POST" }],"admin": [{ "role": "DbManager" },{ "role": "guest" },{ "resource": "permissions", "action": "GET" },{ "resource": "lists", "action": "GET" }]}
    }

    // using authization module to setup authentication and authorization middleware
    const authization = await require('../../../authization-module/authization')
        .setup(app, db, jsonObj)


    app.use('/api', require("../../web-api")(authization))

    app.use((err,req,res,next)=>{
        apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status)
    })

}
