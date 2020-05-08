'use strict'

const
morgan = require('morgan')

// This module is used to setup middleware on the app passed as a parameter
module.exports = function(app) {
    
    // app configurations
    
    // For request logging
    app.use(morgan('tiny'))

}