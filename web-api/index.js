'use strict'

/*
    This file is the entry point for our server, it requires our application and starts listenning on the desired port.
*/

const
    PORT = 8082,
    express = require('express'),
    app = express()

// Setup app's middleware
require('./common/middleware/app-middleware')(app)

app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`))
