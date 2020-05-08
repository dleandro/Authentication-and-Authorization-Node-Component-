'use strict'


// This file defines all routers and passes them the needed parameters

const 
apiUtils = require('./common/util/api-utils'), 
data = require('./common/util/dal-paths'),
router = require('express').Router()

const
userRouter = require('./resources/user/user-router') (apiUtils, data.user),
permissionRouter = require('./resources/permission/permission-router') (apiUtils, data.permission),
roleRouter = require('./resources/role/role-router') (apiUtils, data.role),
listRouter = require('./resources/list/list-router') (apiUtils, data.list),
rolesPermissionRouter = require('./resources/roles-permission/roles-permission-router') (apiUtils, data.rolesPermission),
usersRolesRouter = require('./resources/users-roles/users-roles-router') (apiUtils, data.userRole),
userHistoryRouter = require('./resources/user-history/user-history-router') (apiUtils, data.userHistory),
configRouter = require('./common/config/config-router') 

router.use('/users', userRouter)
router.use('/permissions', permissionRouter)
router.use('/roles', roleRouter)
router.use('/lists', listRouter)
router.use('/roles_permissions', rolesPermissionRouter)
router.use('/users_roles', usersRolesRouter)
router.use('/users_history', userHistoryRouter)
router.use('/configs', configRouter)

module.exports = router
