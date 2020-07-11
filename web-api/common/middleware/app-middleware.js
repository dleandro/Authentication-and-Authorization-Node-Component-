'use strict'

const
    morgan = require('morgan'),
    apiUtils=require('../util/api-utils'),
    middlewareConifg=require('./middleware_config')

// This module is used to setup middleware on the app passed as a parameter
module.exports = async function (app) {


    // app configurations

    // For request logging
    app.use(morgan('tiny'))



    // using authization module to setup authentication and authorization middleware
    const authization = await require('../../../authization-module/authization')
        .setup(app, middlewareConifg.db, middlewareConifg.rbac_opts)


    app.use('/api', require("../../web-api")(authization))

    app.use((err,req,res,next)=>{
        apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status)
    })

}
