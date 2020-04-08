'use strict'
const
dalUtils = require('../../util/dal-utils'),
errors = require('../../errors/app-errors')

module.exports = {

    user: require('./user')(dalUtils, errors),

    rolesPermission: require('./role-permission')(dalUtils, errors),

    usersHistory: require('./user-history')(dalUtils, errors),

    role: require('./role')(dalUtils, errors),
    
    list: require('./list')(dalUtils, errors),
    
    permission: require('./permission')(dalUtils, errors),
    
    userRole: require('./user-role')(dalUtils, errors)

}