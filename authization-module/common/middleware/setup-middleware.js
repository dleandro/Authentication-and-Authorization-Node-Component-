'use strict'

const
    passport = require('./authentication-middleware/passport'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    cookieSecret = 'justasecretstring', // should change after a while if it has some security implication openssl rand -hex 32 on the cmd
    config = require('../config/config'),
    {databasesetup,sequelize}=require('../util/db'),
    SessionStore = require('express-session-sequelize')(session.Store);




      const sequelizeSessionStore = new SessionStore({
        db: sequelize,
    });
    


// This module is used to setup middleware on the app passed as a parameter
module.exports =function (app,jsonObj) {

    // app configurations

    databasesetup(jsonObj)
    

     // Accept request's from different origins, necessary to use our web application
     app.use(require('cors')({
        // how to change origins between clients
        "origin": config.webAppUri,
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        "credentials": true
    }))

    // Makes it easier to manage the request's body
    app.use(bodyParser.json())

    // Makes it easier to manage cookies
    app.use(cookieParser())

    // set up session middleware
    app.use(session({
        // to keep session active instead of letting it change to the idle state
        resave: false,
        //saveUninitialized to false to only create a session if a UA(User agent) made a login
        saveUninitialized: false,
        store: sequelizeSessionStore,
        secret: cookieSecret,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        }
    }))

    app.use(passport.initialize())
    app.use(passport.session())

    //Interceptor that checks for authorization
    //app.use(
    //  (req, res, next) => req.url.includes('authentications') ? next() : authorization.check(req, res, next)
    //)

    config.isModuleSetUp = true
}
