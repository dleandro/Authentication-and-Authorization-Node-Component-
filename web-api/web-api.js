'use strict'


// This file defines all routers and passes them the needed parameters


module.exports = function (authization) {
    
    const
        apiUtils = require('./common/util/api-utils'),
        router = require('express').Router(),
        userRouter = require('./routers/user-router')(apiUtils, authization),
        authenticationRouter = require('./routers/authentication-router')(apiUtils, authization),
        permissionRouter = require('./routers/permission-router')(apiUtils, authization),
        roleRouter = require('./routers/role-router')(apiUtils, authization),
        listRouter = require('./routers/list-router')(apiUtils, authization),
        rolesPermissionRouter = require('./routers/roles-permission-router')(apiUtils, authization),
        usersRolesRouter = require('./routers/users-roles-router')(apiUtils, authization),
        userHistoryRouter = require('./routers/user-history-router')(apiUtils, authization),
        configRouter = require('./routers/config-router')

    router.use('/users', userRouter)
    router.use('/permissions', permissionRouter)
    router.use('/roles', roleRouter)
    router.use('/lists', listRouter)
    router.use('/roles_permissions', rolesPermissionRouter)
    router.use('/users_roles', usersRolesRouter)
    router.use('/users_history', userHistoryRouter)
    router.use('/configs', configRouter)
    router.use('/authentications', authenticationRouter)


    return router
}

