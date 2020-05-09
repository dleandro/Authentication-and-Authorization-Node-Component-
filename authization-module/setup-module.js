'use strict'

const
passport = require('./common/middleware/passport'),
bodyParser = require('body-parser'),
cookieParser = require('cookie-parser'),
session = require('express-session'),
cookie_secret = 'justasecretstring', // should change after a while if it has some security implication openssl rand -hex 32 on the cmd
config = require('./common/config/config'),
MySQLStore = require('express-mysql-session')(session),
sessionStore = new MySQLStore(config.database_opts),
checkAuth=require('./functionalities/authorization/check-auth')

// This module is used to setup middleware on the app passed as a parameter
module.exports = function(app) {
    
    // app configurations
    
    // Makes it easier to manage the request's body
    app.use(bodyParser.json()) 

    // Makes it easier to manage cookies
    app.use(cookieParser())

    // Accept request's from different origins, necessary to use our web application
    app.use(require('cors')({
        // how to change origins between clients
        "origin": "http://localhost:3000",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        "credentials": true
    }))

    app.use(session({
        // to keep session active instead of letting it change to the idle state
        resave: false, 
        //saveUninitialized to false to only create a session if a UA(User agent) made a login
        saveUninitialized: true,
        store: sessionStore,
        secret: cookie_secret,
        cookie:{
            maxAge:1000*60*60*24
        }
    }))
    
    //Interceptor that checks for authorization
    //app.use(checkAuth.hasPermissions)

    app.use(passport.initialize())
    app.use(passport.session())
}