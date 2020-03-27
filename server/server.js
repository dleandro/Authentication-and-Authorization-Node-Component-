'use strict'

const
PORT = /*process.env.PORT ||*/ 8082,
express = require('express'),
session = require('express-session'),
passport = require('./passport'),
path = require("path"),
data = require('./data/dal'),
service = require("./service")(data),
bodyParser = require('body-parser'),
cookieParser = require('cookie-parser'),
app = express(),
fs = require('fs'),
https = require('https'),
cookie_secret = 'justasecretstring' // should change after a while if it has some security implication  openssl rand -hex 32 on the cmd
  
  // google client-id 523982739771-2hkfdqls3uapvlf0c111i6qhnidfgt44.apps.googleusercontent.com
  // google client-secret vs0R8tvgMv2w2rhuHtRPT9nK

// app configurations
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.json()) // Makes it easier to manage the request's body
// Homepage leads to our web app, make sure web app has updated production build
app.use('/', express.static(path.resolve(process.cwd(), 'web-app', 'build'))) 
app.use(session({
  resave: true, // to keep session active instead of letting it change to the idle state
  //saveUninitialized to false to only create a session if a UA(User agent) made a login
  saveUninitialized: false,
  secret: cookie_secret
}))

app.use(passport.initialize())
app.use(passport.session())

// routes and their behaviour
const api = require("./web-api")(app, service)

app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`))