'use strict'

// This file is the entry point for our authentication and autorization nodejs module
// it also calls the setup file



module.exports = function (app, db, jsonObj) {

    const
        config = require('./common/config/config'),
        session = require('express-session')

    config.database_opts = db;

    const
        { databasesetup, sequelize } = require('./common/util/db'),
        SessionStore = require('express-session-sequelize')(session.Store),
        sequelizeSessionStore = new SessionStore({
            db: sequelize,
        }),
        rbac = databasesetup(jsonObj),
        session_opts = {// to keep session active instead of letting it change to the idle state
            resave: false,
            //saveUninitialized to false to only create a session if a UA(User agent) made a login
            saveUninitialized: false,
            store: sequelizeSessionStore,
            secret: config.cookieSecret,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24
            }
        }

    const functionalities = {


        /**
         * returns the authentication file which includes all types of authentications we support
         */
        authenticate: require('./resources/authentications'),

        /**
         * returns the check-authorization file which includes a method that verifies if the desired action
         * is allowed for the suthenticated user
         */
        authorization: require('./resources/authorizations'),

        /**
         * returns user resource file to manage users
         */
        user: require('./resources/dals/users-dal'),

        /**
         * returns idp resource file to manage idp users
         */
        idp: require('./resources/dals/idps-dal'),

        /**
         * returns list resource file to manage lists
         */
        list: require('./resources/dals/lists-dal'),

        /**
         * returns permission resource file to manage permissions
         */
        permission: require('./resources/dals/permissions-dal')(rbac),

        /**
         * returns role resource file to manage roles
         */
        role: require('./resources/dals/roles-dal')(rbac),

        /**
         * returns userRole resource file to manage user's roles
         */
        userRole: require('./resources/dals/users-roles-dal'),

        /**
         * returns rolePermission resource file to manage role's permissions
         */
        rolePermission: require('./resources/dals/roles-permissions-dal')(rbac),

        /**
         * returns userHistory resource file to check user's history
         */
        userHistory: require('./resources/dals/users-history-dal'),

        /**
         * returns configuration management file
         */
        configurations: require('./resources/configurations'),

        protocols: require('./resources/dals/protocols-dal')


    }

    if (config.isModuleSetUp) {

        return functionalities

    }

    if (app) {

        // setup required middleware
        require('./common/middleware/setup-middleware')(app, session(session_opts))

        return functionalities
    }

    return {}

}
