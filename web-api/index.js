'use strict'

/*
    This file is the entry point for our server, it requires our application and starts listenning on the desired port.
*/

const
PORT = 8082,
app = require('./server')

app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`))