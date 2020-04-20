'use strict'

const 
apiUtils = require('./common/util/api-utils'), 
data = require('./common/util/dal-paths')


module.exports = function(app) {
    
    const
    userRouter = require('./user/user-router') (apiUtils, data.user),
    permissionRouter = require('./permission/permission-router') (apiUtils, data.permission),
    roleRouter = require('./role/role-router') (apiUtils, data.role),
    listRouter = require('./list/list-router') (apiUtils, data.list),
    rolesPermissionRouter = require('./roles-permission/roles-permission-router') (apiUtils, data.rolesPermission),
    usersRolesRouter = require('./users-roles/users-roles-router') (apiUtils, data.usersRoles),
    userHistoryRouter = require('./user-history/user-history-router') (apiUtils, data.userHistory),
    authenticationRouter = require('./user/authentication-router') (apiUtils, data.user)
    

    app.use('/user', userRouter)
    app.use('/permission', permissionRouter)
    app.use('/role', roleRouter)
    app.use('/list', listRouter)
    app.use('/roles-permission', rolesPermissionRouter)
    app.use('/users-roles', usersRolesRouter)
    app.use('/user-history', userHistoryRouter)
    app.use('/authentication', authenticationRouter)
    
}