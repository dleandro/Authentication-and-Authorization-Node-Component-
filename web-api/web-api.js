'use strict'


// This file defines all routers and passes them the needed parameters

module.exports = (authization) => {

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
        configRouter = require('./routers/config-router')(apiUtils, authization),
        authTypeRouter = require('./routers/auth-types-router')(apiUtils, authization),
        sessionRouter=require('./routers/session-router')(apiUtils,authization),
        userListRouter=require('./routers/user-list-router')(apiUtils,authization),
        profileRouter=require('./routers/profile-router')(apiUtils,authization)
    
    router.use('/users', userRouter)
    router.use('/users-lists',userListRouter)
    router.use('/permissions', permissionRouter)
    router.use('/roles', roleRouter)
    router.use('/lists', listRouter)
    router.use('/roles-permissions', rolesPermissionRouter)
    router.use('/users-roles', usersRolesRouter)
    router.use('/users-history', userHistoryRouter)
    router.use('/configs', configRouter)
    router.use('/authentications', authenticationRouter)
    router.use('/auth-types', authTypeRouter)
    router.use('/sessions',sessionRouter)
    router.use('/profile',profileRouter)
    
    return router

}



