'use strict'

// Sets up the whole server with needed middleware and available endpoints

const
    express = require('express'),
    app = express(),
    path = require('path')

// Setup app's middleware
require('./common/middleware/app-middleware')(app)

// export the app for testing
module.exports = app
