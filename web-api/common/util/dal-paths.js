'use strict'
const
dalUtils = require('./dal-utils'),
errors = require('../errors/app-errors')

module.exports = {

    user: require('../../resources/user/user-dal')(dalUtils, errors),

    rolesPermission: require('../../resources/roles-permission/role-permission-dal')(dalUtils, errors),

    usersHistory: require('../../resources/user-history/user-history-dal')(dalUtils, errors),

    role: require('../../resources/role/role-dal')(dalUtils, errors),
    
    list: require('../../resources/list/list-dal')(dalUtils, errors),
    
    permission: require('../../resources/permission/permission-dal')(dalUtils, errors),
    
    userRole: require('../../resources/users-roles/user-role-dal')(dalUtils, errors),

    userHistory: require('../../resources/user-history/user-history-dal') (dalUtils, errors)

}