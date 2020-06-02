'use strict'

const
    morgan = require('morgan')

// This module is used to setup middleware on the app passed as a parameter
module.exports = function (app,db) {

    // app configurations

    // using authization module to setup authentication and authorization middleware
    require('../../../authization-module/authization')(app,db)

    // For request logging
    app.use(morgan('tiny'))


}
