'use strict'

const
express = require('express'),
app = express(),
path = require("path"),
data = require('./data/dal/dal-paths'),
service = require("./api/service")(data)

// Setup app's middleware
require('./middleware/app-middleware')(app)

// Homepage leads to our web app, make sure web app has updated production build
app.use('/', express.static(path.resolve(__dirname, '..', 'web-app', 'build')))

// routes and their behaviour
require("./api/web-api")(app, service)

// export the app for testing
module.exports = app