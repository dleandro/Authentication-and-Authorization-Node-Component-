'use strict'

/*
    This file is the entry point for our server, it requires our application and starts listenning on the desired port.
*/

console.log(require('dotenv').config())

const
    express = require('express'),
    app = express()


// Setup app's middleware
require('./common/middleware/app-middleware')(app, express)

app.listen(process.env.PORT || 8080, () => console.log(`Listening on Port: ${process.env.PORT || 8080}`))
