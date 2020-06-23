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

    const rbac_opts = {
        "roles": ["admin", "DbManager", "Developer","guest"],
        "permissions": [
            { "resource": "users-lists", "action": "GET" },
            { "resource": "users-lists", "action": "POST" },
            { "resource": "users-lists", "action": "PUT" },
            { "resource": "users-lists", "action": "DELETE" },
            { "resource": "protocols", "action": "GET" },
            { "resource": "protocols", "action": "POST" },
            { "resource": "protocols", "action": "PUT" },
            { "resource": "protocols", "action": "DELETE" },
            { "resource": "permissions", "action": "GET" },
            { "resource": "permissions", "action": "POST" },
            { "resource": "permissions", "action": "PUT" },
            { "resource": "permissions", "action": "DELETE" },
            { "resource": "roles", "action": "GET" },
            { "resource": "roles", "action": "POST" },
            { "resource": "roles", "action": "PUT" },
            { "resource": "roles", "action": "DELETE" },
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
                 { "resource": "roles", "action": "DELETE" },
                 { "resource": "roles", "action": "PUT" },
                 { "resource": "permissions", "action": "POST" },
                 { "resource": "permissions", "action": "DELETE" },
                 { "resource": "permissions", "action": "PUT" },
                 { "resource": "users", "action": "GET" }, 
                 { "resource": "roles", "action": "GET" },
                 { "resource": "users", "action": "PUT" },
                 { "resource": "users", "action": "DELETE" }
                ],
                "guest":[
                    { "resource": "protocols", "action": "GET" },
                    { "resource": "authentications", "action": "GET" },
                    { "resource": "authentications", "action": "POST" },
                    { "resource": "users", "action": "POST" }
                ],
                "admin": [
                    { "role": "DbManager" },
                    { "role": "guest" },
                    { "resource": "roles-permissions", "action": "POST" },
                    { "resource": "roles-permissions", "action": "GET" },
                    { "resource": "permissions", "action": "GET" },
                    { "resource": "lists", "action": "GET" },
                    { "resource": "users-roles", "action": "POST" },
                    { "resource": "protocols", "action": "POST" },
                    { "resource": "protocols", "action": "PUT" },
                    { "resource": "sessions", "action": "GET" },
                    { "resource": "users-lists", "action": "POST" },
                ]
            }
    }

    // using authization module to setup authentication and authorization middleware
    const authization = await require('../../../authization-module/authization')
        .setup(app, db, rbac_opts)


    app.use('/api', require("../../web-api")(authization))

    app.use((err,req,res,next)=>{
        apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status)
    })

}
