'use strict'

const
DEFAULT_PORT = 8082,
express = require('express'),
bodyParser = require('body-parser'),
session = require('express-session'),   // Do we need this?
passport = require('passport'),
app = express(),
api = require("./web-api")(app)

var cookie_secret = 'justasecretstring' // should change after a while if it has some 
                                        // security implication

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

passport.serializeUser(api.userToRef());      // userToRef endpoint missing
passport.deserializeUser(api.refToUser());    // refToUser endpoint missing

app.listen(DEFAULT_PORT, () => console.log(`Listening on Port:${DEFAULT_PORT} `))