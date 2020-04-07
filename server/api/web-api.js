'use strict'

const auth = require("../data/auth"),
passport = require('passport')

module.exports = function(app, service) {
    
    const
    userRouter = require('./routes/user-router') (service),
    permissionRouter = require('./routes/permission-router') (service),
    roleRouter = require('./routes/role-router') (service),
    listRouter = require('./routes/list-router') (service)
    
    app.use('/user', userRouter)
    app.use('/permission', permissionRouter)
    app.use('/role', roleRouter)
    app.use('/list', listRouter)
    
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
                        setResponse(res, err, 400)
                    }
                    setResponse(res, answer, 200)
                })
            })
            .catch(err => setResponse(res, JSON.parse(err.message).detail, JSON.parse(err.message).status))
        }],
        
        ['/logout',(req,res)=>{
            req.logout()
            setResponse(res, "Logout succesfull", 200)
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