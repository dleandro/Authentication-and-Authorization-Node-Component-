'use strict'

const
    morgan = require('morgan'),
    apiUtils = require('../util/api-utils'),
    middlewareConifg = require('./middleware_config'),
    path = require('path'),
    cors = require('cors')

// This module is used to setup middleware on the app passed as a parameter
module.exports = async function (app, express) {


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
        //const authization = await require('@authization/authization')
        const authization = await require('../../../authization-module/authization')
            .setup({ app, db: middlewareConifg.cloud_db, rbac_opts: middlewareConifg.rbac_opts })

        app.use('/api', require("../../web-api")(authization))

        // Every endpoint that doesn't start with /api is redirected to our web app, make sure web app has updated production build
        //app.use(express.static(path.resolve(__dirname, '..', '..', '..', 'web-app', 'build')))

        // serve all get requests with react router
        //app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '..', '..', '..', 'web-app', 'build', 'index.html')))

    } catch (error) {
        console.error(error)
    }

    // error handler
    app.use((err, req, res, next) => {
        console.log(err)
        apiUtils.setResponse(res, { err: err.message }, err.status || 400)
    })

}