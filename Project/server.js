const
DEFAULT_PORT = 8082,
express = require('express'),
app = express(),
api = require("./web-api")(app)

app.listen(DEFAULT_PORT, () => console.log(`Listening on Port:${DEFAULT_PORT} `))