'use strict'

// Sets up the whole server with needed middleware and available endpoints

const
    express = require('express'),
    app = express(),
    db={
        "host": "eporqep6b4b8ql12.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
        "port": 3306,
        "user": "jvp56pl2nbv1v9pw",
        "password": "pv9t6oy23bsv65ri",
        "connectionLimit": 5,
        "database": "r15dtqer5c72jvex"
      }

// Setup app's middleware
require('./common/middleware/app-middleware')(app,db)

// api routes and their behaviour
app.use('/api', require("./web-api"))

// Every endpoint that doesn't start with /api is redirected to our web app, make sure web app has updated production build
//app.use(express.static(path.resolve(__dirname, '..', 'web-app', 'build')))

// serve all get requests with react router
//app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '..', 'web-app', 'build', 'index.html')))

// export the app for testing
module.exports = app
