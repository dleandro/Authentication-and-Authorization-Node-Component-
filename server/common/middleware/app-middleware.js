'use strict'

const
passport = require('./passport/passport'),
bodyParser = require('body-parser'),
cookieParser = require('cookie-parser'),
morgan = require('morgan'),
session = require('express-session'),
//cookie_session=require('cookie-session'),
cookie_secret = 'justasecretstring', // should change after a while if it has some security implication  openssl rand -hex 32 on the cmd
config = require('../config/config'),
MySQLStore = require('express-mysql-session')(session),
sessionStore = new MySQLStore(config.database_opts)

// This module is used to setup middleware on the app passed as a parameter
module.exports = function(app) {
    
    // app configurations
    
    // For request logging
    app.use(morgan('tiny'))

    let allowCrossDomain = function(req, res, next) {
        res.header('Access-Control-Allow-Origin', "http://localhost:3000");
        res.header('Access-Control-Allow-Headers', "Content-Type");
        res.header('Access-Control-Allow-Methods' ,['POST', 'GET', 'OPTIONS','DELETE','PUT'])
        res.header('Access-Control-Allow-Credentials', true);
        next();
      }
      app.use(allowCrossDomain);
    
    app.use(bodyParser.json()) // Makes it easier to manage the request's body
    app.use(cookieParser())

    //app.use(require('cors')())
    
    app.use(session({
        resave: false, // to keep session active instead of letting it change to the idle state
        //saveUninitialized to false to only create a session if a UA(User agent) made a login
        saveUninitialized: true,
        store: sessionStore,
        secret: cookie_secret,
        cookie:{
            maxAge:1000*60*60*24
        }
    }))
    
    app.use(passport.initialize())
    app.use(passport.session())

    app.use((req,res,next)=>{
        console.log(req.session);
        console.log(req.user);
        next()
    })

    
}