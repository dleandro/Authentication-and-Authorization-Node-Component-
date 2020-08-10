'use strict'

const
    morgan = require('morgan'),
    apiUtils = require('../util/api-utils'),
    middlewareConifg = require('./middleware_config'),
    cors = require('cors')

// This module is used to setup middleware on the app passed as a parameter
module.exports = async function (app) {

    var corsOptions = {
        origin: ['https://webapp-dot-auth-authorization.ew.r.appspot.com', 'http://localhost:3000'],
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204,
        credentials: true
    }

    // app configurations
    app.use(cors(corsOptions))
    // For request logging
    app.use(morgan('tiny'))

    try {
        // using authization module to setup authentication and authorization middleware
        // const authization = await require('@authization/authization')
        const authization = await require('../../../authization-module/authization')
            .setup({ app, db: middlewareConifg.cloud_db,/* rbac_opts: middlewareConifg.rbac_opts*/})

        app.use('/api', require("../../web-api")(authization))

    } catch (error) {
        console.error(error)
    }

    // error handler
    app.use((err, req, res, next) => {
        console.log(err)
        apiUtils.setResponse(res, { err: err.message }, err.status || 400)
    })

}