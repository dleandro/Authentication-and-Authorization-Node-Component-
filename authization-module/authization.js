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
        user: require('./resources/users/users-dal'),

        /**
         * returns idp resource file to manage idp users
         */
        idp: require('./resources/idps/idps-dal'),

        /**
         * returns list resource file to manage lists
         */
        list: require('./resources/lists/lists-dal'),

        /**
         * returns permission resource file to manage permissions
         */
        permission: require('./resources/permissions/permissions-dal'),

        /**
         * returns role resource file to manage roles
         */
        role: require('./resources/roles/roles-dal'),

        /**
         * returns userRole resource file to manage user's roles
         */
        userRole: require('./resources/users-roles/users-roles-dal'),

        /**
         * returns rolePermission resource file to manage role's permissions
         */
        rolePermission: require('./resources/roles-permission/roles-permissions-dal'),

        /**
         * returns userHistory resource file to check user's history
         */
        userHistory: require('./resources/users-history/users-history-dal'),

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
