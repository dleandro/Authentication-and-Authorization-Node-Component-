'use strict'

/*
    This file is the entry point for our server, it requires our application and starts listenning on the desired port.
*/


const
    express = require('express'),
    app = express(),
    path=require('path')


// Setup app's middleware
require('./common/middleware/app-middleware')(app, express)

require('dotenv').config({ path: path.resolve(__dirname, './.env') })

app.listen(process.env.PORT || 8080, () => console.log(`Listening on Port: ${process.env.PORT || 8080}`))
