'use strict'

// This file is the entry point for our authentication and autorization nodejs module
module.exports = {

    // returns the authentication file which includes all types of authentications we support
    authenticate: require('./functionalities/authentication/types-of'),

    // returns the check-authorization file which includes a method that verifies if the desired action 
    // is allowed for the suthenticated user
    checkAuthorization: require('./functionalities/authorization/check-auth'),

    // returns user resource file to manage users
    user: require('./functionalities/user/manage-users'),

    // returns list resource file to manage lists
    list: require('./functionalities/list/manage-lists'),

    // returns permission resource file to manage permissions
    permission: require('./functionalities/permission/manage-permissions'),
    
    // returns role resource file to manage roles
    role: require('./functionalities/role/manage-roles'),
    
    // returns userRole esource file to manage user's roles
    userRole: require('./functionalities/user-role/manage-users-roles'),

    // returns rolePermission resource file to manage role's permissions
    rolePermission: require('./functionalities/roles-permission/manage-roles-permissions'),

    // returns userHistory resource file to check user's history
    userHistory: require('./functionalities/users-history/check-users-history'),

}