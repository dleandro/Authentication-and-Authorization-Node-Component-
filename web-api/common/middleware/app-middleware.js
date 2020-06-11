'use strict'

const
    morgan = require('morgan')

// This module is used to setup middleware on the app passed as a parameter
module.exports = function (app) {

    // app configurations

    const db={
        "host": "eporqep6b4b8ql12.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
        "port": 3306,
        "user": "jvp56pl2nbv1v9pw",
        "password": "pv9t6oy23bsv65ri",
        "connectionLimit": 5,
        "database": "r15dtqer5c72jvex"
      }

   

    // using authization module to setup authentication and authorization middleware
    require('../../../authization-module/authization')(app,db)


    // For request logging
    app.use(morgan('tiny'))


}
