'use strict'

const
    morgan = require('morgan'),
    apiUtils = require('../util/api-utils'),
    middlewareConifg = require('./middleware_config')

// This module is used to setup middleware on the app passed as a parameter
module.exports = async function (app) {

    // app configurations

    // For request logging
    app.use(morgan('tiny'))

    try {
        // using authization module to setup authentication and authorization middleware
        const authization = await require('../../../authization-module/authization')
            .setup({ app, db: middlewareConifg.db, rbac_opts: middlewareConifg.rbac_opts })

        app.use('/api', require("../../web-api")(authization))
    } catch (error) {
        console.error(error)
        throw error
    }

    // error handler
    app.use((err, req, res, next) => {
        console.log(err)
        apiUtils.setResponse(res, err.message, err.status || 400)
    })

}
