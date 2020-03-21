'use strict'

const
DEFAULT_PORT = 8082,
express = require('express'),
session = require('express-session'),
passport = require('passport'),
OpenIDStrategy = require('passport-openid').Strategy,
path = require("path"),
data = require('./dal/data'),
service = require('./service')(data),
app = express()

var cookie_secret = 'justasecretstring' // should change after a while if it has some security implication

passport.use(new OpenIDStrategy({
    returnURL: 'http://www.example.com/auth/openid/return',
    realm: 'http://www.example.com/'
  },
  function(identifier, done) {
    User.findOrCreate({ openId: identifier }, function(err, user) {
      done(err, user);
    });
  }
));

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing. 
passport.serializeUser(function(user, done) {
    done(null, user.identifier);
});

passport.deserializeUser(async function(identifier, done) {

    var user = await fetch('/get-user',
        {method: 'GET',headers : { 'Content-type': 'application/json'}, userId: identifier}
        );

    done(null, { user: user });
});

// app configurations
app.use(express.json()) // Makes it easier to manage the request's body
// Homepage leads to our web app, make sure web app has updated production build
app.use('/', express.static(path.resolve(__dirname, '..', 'web-app', 'build'))) 
app.use(session({
    resave: false,
    //saveUninitialized to false to only create a session if a UA(User agent) made a login
    saveUninitialized: false,
    secret: cookie_secret,
    cookie: { secure: true }
}))
app.use(passport.initialize())
app.use(passport.session())

// routes and their behaviour
const api = require("./web-api")(app, service, passport)


app.listen(DEFAULT_PORT, () => console.log(`Listening on Port:${DEFAULT_PORT} `))