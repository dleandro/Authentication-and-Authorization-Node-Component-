'use strict'

// This file is the entry point for our authentication and autorization nodejs module
// it also calls the setup file

const
    config = require('./common/config/config'),
    functionalities = {


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
        idp: require('./resources/idps/idps-dal'),

        /**
         * returns list resource file to manage lists
         */
        list: require('./resources/dals/lists-dal'),

        /**
         * returns permission resource file to manage permissions
         */
        permission: require('./resources/dals/permissions-dal'),

        /**
         * returns role resource file to manage roles
         */
        role: require('./resources/dals/roles-dal'),

        /**
         * returns userRole resource file to manage user's roles
         */
        userRole: require('./resources/dals/users-roles-dal'),

        /**
         * returns rolePermission resource file to manage role's permissions
         */
        rolePermission: require('./resources/dals/roles-permissions-dal'),

        /**
         * returns userHistory resource file to check user's history
         */
        userHistory: require('./resources/dals/users-history-dal'),

        /**
         * returns configuration management file
         */
        configurations: require('./resources/configurations')


    }

module.exports = function (app) {

    if (config.isModuleSetUp) {

        return functionalities

    }

    if (app) {

        // setup required middleware
        require('./common/middleware/setup-middleware')(app)

        return functionalities
    }

    return {}

}
