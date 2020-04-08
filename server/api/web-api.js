'use strict'

const auth = require("../data/auth"),
passport = require('passport'),
apiUtils = require('../util/api-utils')


module.exports = function(app, service) {
    
    const
    userRouter = require('./routes/user-router') (apiUtils, service),
    permissionRouter = require('./routes/permission-router') (apiUtils, service),
    roleRouter = require('./routes/role-router') (apiUtils, service),
    listRouter = require('./routes/list-router') (apiUtils, service),
    rolesPermissionRouter = require('./routes/roles-permission-router') (apiUtils, service),
    usersRolesRouter = require('./routes/users-roles-router') (apiUtils, service)
    
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
        }]
        
    ]).forEach((handler,path) => app.get(path, handler)) 
    
    // POST endpoints
    new Map([
        
        ['/login', (req, res)=> {
            service.loginUser(req.body.username, req.body.password)
            .then(answer => {
                
                req.login({
                    id: answer.id,
                    username: answer.username,
                    password: answer.password,
                    role: answer.role
                    
                }, (err, result) => {
                    if (err) {
                        apiUtils.setResponse(res, err, 400)
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