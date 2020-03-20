'use strict'

const
DEFAULT_PORT = 8082,
express = require('express'),
bodyParser = require('body-parser'),
session = require('express-session'),
passport = require('passport'),
path = require("path"),
data = require('./dal/data'),
service = require('./service')(data),
app = express(),
api = require("./web-api")(app, service)

var cookie_secret = 'justasecretstring' // should change after a while if it has some security implication

// Homepage leads to our web app, make sure web app has updated production build
app.use('/', express.static(path.resolve(__dirname, '..', 'web-app', 'build'))) 
app.use(bodyParser.json())  // Makes it easier to manage the request's body
app.use(session({
    resave: false,
    //saveUninitialized to false to only create a session if a UA(User agent) made a login
    saveUninitialized: false,
    secret: cookie_secret,
    cookie: { secure: true }
}))

app.use(express.json());
app.use(passport.initialize())
app.use(passport.session())

//passport.serializeUser(api.userToRef());      // userToRef endpoint missing
//passport.deserializeUser(api.refToUser());    // refToUser endpoint missing

app.listen(DEFAULT_PORT, () => console.log(`Listening on Port:${DEFAULT_PORT} `))