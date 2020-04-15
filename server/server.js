'use strict'

const
express = require('express'),
app = express(),
path = require("path")

// Setup app's middleware
require('./common/middleware/app-middleware')(app)

// Homepage leads to our web app, make sure web app has updated production build
app.use('/', express.static(path.resolve(__dirname, '..', 'web-app', 'build')))

// routes and their behaviour
require("./web-api")(app)

// export the app for testing
module.exports = app