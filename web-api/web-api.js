'use strict'


// This file defines all routers and passes them the needed parameters

const 
apiUtils = require('./common/util/api-utils'), 
router = require('express').Router()

const
userRouter = require('./routers/user-router') (apiUtils),
authenticationRouter=require('./routers/authentication-router')(apiUtils),
permissionRouter = require('./routers/permission-router') (apiUtils),
roleRouter = require('./routers/role-router') (apiUtils),
listRouter = require('./routers/list-router') (apiUtils),
rolesPermissionRouter = require('./routers/roles-permission-router') (apiUtils),
usersRolesRouter = require('./routers/users-roles-router') (apiUtils),
userHistoryRouter = require('./routers/user-history-router') (apiUtils),
configRouter = require('./routers/config-router')

router.use('/users', userRouter)
router.use('/permissions', permissionRouter)
router.use('/roles', roleRouter)
router.use('/lists', listRouter)
router.use('/roles_permissions', rolesPermissionRouter)
router.use('/users_roles', usersRolesRouter)
router.use('/users_history', userHistoryRouter)
router.use('/configs', configRouter)
router.use('/authentications',authenticationRouter)

module.exports = router
