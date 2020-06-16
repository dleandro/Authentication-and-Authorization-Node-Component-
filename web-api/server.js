'use strict'

// Sets up the whole server with needed middleware and available endpoints

const
    express = require('express'),
    app = express(),
    path=require('path')

// Setup app's middleware
const authization=require('./common/middleware/app-middleware')(app)

// api routes and their behaviour
app.use('/api', require("./web-api")(authization))

// export the app for testing
module.exports = app
