'use strict'

/*
    This file is the entry point for our server, it requires our application and starts listenning on the desired port.
    This port must be configured on the config file
*/

const
app = require('./server')

app.listen(8080, () => console.log(`Listening on Port: 8080`))