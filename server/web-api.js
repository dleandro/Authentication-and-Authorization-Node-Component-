'use strict'

const auth = require("./common/data/auth"),
passport = require('passport'),
apiUtils = require('./common/util/api-utils'), 
data = require('./common/util/dal-paths')


module.exports = function(app) {
    
    const
    userRouter = require('./user/user-router') (apiUtils, data.user),
    permissionRouter = require('./permission/permission-router') (apiUtils, data.permission),
    roleRouter = require('./role/role-router') (apiUtils, data.role),
    listRouter = require('./list/list-router') (apiUtils, data.list),
    rolesPermissionRouter = require('./roles-permission/roles-permission-router') (apiUtils, data.rolesPermission),
    usersRolesRouter = require('./users-roles/users-roles-router') (apiUtils, data.usersRoles)
    

    app.use('/user', userRouter)
    app.use('/permission', permissionRouter)
    app.use('/role', roleRouter)
    app.use('/list', listRouter)
    app.use('/roles-permission', rolesPermissionRouter)
    app.use('/users-roles', usersRolesRouter)

    
    //GET endpoints
    new Map([
        
        ['/google-login', passport.authenticate('google', {scope: ['profile']}), (req, res) =>{
            res.end(JSON.stringify(req.user))
        }],

        ['/saml-login', passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }), (req, res) =>{
            res.end(JSON.stringify(req.user))
        }]
        
    ]).forEach((handler,path) => app.get(path, handler)) 
    
    // POST endpoints
    new Map([
        
        ['/login', (req, res)=> {
            data.user.getUser([req.body.username, req.body.password])
            .then(answer => {
                
                req.login({
                    id: answer.id,
                    username: answer.username,
                    password: answer.password,
                    role: answer.role
                    
                }, (err, result) => {

                    if (err) {
                        apiUtils.setResponse(res, err.message, 400)
                    }
                    apiUtils.setResponse(res, answer, 200)
                })
            })
            .catch(err => apiUtils.setResponse(res, JSON.parse(err.message).detail, JSON.parse(err.message).status))
        }],
        
        ['/logout', (req,res)=>{
            req.logout()
            apiUtils.setResponse(res, "Logout succesfull", 200)
            res.redirect('/homepage')
        }],
        
        ['/kerberos-login', (req,res)=>{
            
        }],
        
        ['/openid-login', (req, res) => {
            res.end(JSON.stringify(req.user))
        }]
        
    ]).forEach((handler, path)=>app.post(path,handler))
    
    app.post('/saml-login', passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),(req,res)=>res.redirect('/homepage'))
    app.put('/change-user-status', (req, res) => {
        
    })
    
}