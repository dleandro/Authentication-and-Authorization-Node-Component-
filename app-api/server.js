'use strict'

// Sets up the whole server with needed middleware and available endpoints

const
express = require('express'),
path = require('path'),
morgan = require('morgan')
app = express()

app.use(morgan('tiny'))

// using authization module to setup authentication and authorization middleware
require('../authization-module/common/middleware/setup-authization-middleware')(app)

// Every endpoint that doesn't start with /api is redirected to our web app, make sure web app has updated production build
app.use(express.static(path.resolve(__dirname, '..', 'web-app', 'build')))

// api routes and their behaviour
app.use('/api/authentications', require('./router'))

// serve all get requests with react router
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '..', 'web-app', 'build', 'index.html')))

// export the app for testing
module.exports = app