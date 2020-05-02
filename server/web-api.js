'use strict'


// This file defines all routers and passes them the needed parameters

const 
apiUtils = require('./common/util/api-utils'), 
data = require('./common/util/dal-paths'),
auth=require('./common/data/auth'),
router = require('express').Router()

const
userRouter = require('./user/user-router') (auth, apiUtils, data.user),
permissionRouter = require('./permission/permission-router') (apiUtils, data.permission),
roleRouter = require('./role/role-router') (apiUtils, data.role),
listRouter = require('./list/list-router') (apiUtils, data.list),
rolesPermissionRouter = require('./roles-permission/roles-permission-router') (apiUtils, data.rolesPermission),
usersRolesRouter = require('./users-roles/users-roles-router') (apiUtils, data.userRole),
userHistoryRouter = require('./user-history/user-history-router') (apiUtils, data.userHistory),
authenticationRouter = require('./user/authentication-router') (apiUtils, data.user),
configRouter = require('./common/config/config-router') 

router.use('/users', userRouter)
router.use('/permissions', permissionRouter)
router.use('/roles', roleRouter)
router.use('/lists', listRouter)
router.use('/roles_permissions', rolesPermissionRouter)
router.use('/users_roles', usersRolesRouter)
router.use('/users_history', userHistoryRouter)
router.use('/authentications', authenticationRouter)
router.use('/configs', configRouter)

module.exports = router
