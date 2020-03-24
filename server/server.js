'use strict'

const
PORT = process.env.PORT || 8082,
fetch = require("node-fetch"),
express = require('express'),
session = require('express-session'),
passport = require('passport'),
SamlStrategy = require('passport-saml').Strategy,
path = require("path"),
data = require('./data/dal'),
service = require("./service")(data),
bodyParser = require('body-parser'),
cookieParser = require('cookie-parser'),
app = express()

var cookie_secret = 'justasecretstring' // should change after a while if it has some security implication

/*
passport.use(new OpenIDStrategy({
    returnURL: 'http://www.example.com/auth/openid/return',
    realm: 'http://www.example.com/'
  },
  function(identifier, done) {
    User.findOrCreate({ openId: identifier }, function(err, user) {
      done(err, user);
    });
  }
));*/

passport.use(new SamlStrategy(
  {
    path: '/login/callback',  //redirect after sucessfull login
    entryPoint: 'https://openidp.feide.no/simplesaml/saml2/idp/SSOService.php',
    issuer: 'passport-saml'
  },
  function(profile, done) {
    findByEmail(profile.email, function(err, user) {
      if (err) {
        return done(err);
      }
      return done(null, user);
    });
  })
);

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing. 

// app configurations
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.json()) // Makes it easier to manage the request's body
// Homepage leads to our web app, make sure web app has updated production build
app.use('/', express.static(path.resolve(process.cwd(), 'web-app', 'build'))) 
app.use(session({
    resave: false,
    //saveUninitialized to false to only create a session if a UA(User agent) made a login
    saveUninitialized: false,
    secret: cookie_secret
}))
app.use(passport.initialize())
app.use(passport.session())

// routes and their behaviour
const api = require("./web-api")(app, service, passport)

function userToRef(user, done) {
  done(null, user.id);
}

function refToUser(userRef, done) {
  fetch("http://localhost:8082/user", {
    method: "GET", 
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'same-origin',
    body :{
      "userId" :userRef
    } 
  }).then(response=>response.json())
  .then(user => {
    if (user) {
        done(null, user);
    } else {
        done('User unknown');
    }
  })
}

passport.serializeUser(userToRef);
passport.deserializeUser(refToUser);


app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`))