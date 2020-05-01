'use strict'

const 
apiUtils = require('./common/util/api-utils'), 
data = require('./common/util/dal-paths'),
fs=require('fs'),
auth=require('./common/data/auth'),
router = require('express').Router()

const
userRouter = require('./user/user-router') (auth,apiUtils, data.user),
permissionRouter = require('./permission/permission-router') (apiUtils, data.permission),
roleRouter = require('./role/role-router') (apiUtils, data.role),
listRouter = require('./list/list-router') (apiUtils, data.list),
rolesPermissionRouter = require('./roles-permission/roles-permission-router') (apiUtils, data.rolesPermission),
usersRolesRouter = require('./users-roles/users-roles-router') (apiUtils, data.usersRoles),
userHistoryRouter = require('./user-history/user-history-router') (apiUtils, data.userHistory),
authenticationRouter = require('./user/authentication-router') (apiUtils, data.user)

router.use('/user', userRouter)
router.use('/permission', permissionRouter)
router.use('/role', roleRouter)
router.use('/list', listRouter)
router.use('/roles-permission', rolesPermissionRouter)
router.use('/users-roles', usersRolesRouter)
router.use('/user-history', userHistoryRouter)
router.use('/authentication', authenticationRouter)

router.post('/config/database',(req,res)=>{
  let obj=req.body
  let config=JSON.parse(fs.readFileSync(__dirname+'/common/config/production.json','utf-8'))
  console.log(config)
  config.database_opts=obj
  console.log(config)
  res.end()
})

router.post('/config/google',(req,res)=>{
  let obj=req.body
  let config=JSON.parse(fs.readFileSync(__dirname+'/common/config/production.json','utf-8'))
  console.log(config)
  config.google=obj
  console.log(config)
  res.end()
})

router.post('/config/azureAD',(req,res)=>{
  let obj=req.body
  let config=JSON.parse(fs.readFileSync(__dirname+'/common/config/production.json','utf-8'))
  console.log(config)
  config.azureAD=obj
  console.log(config)
  res.end()
})


module.exports = router
