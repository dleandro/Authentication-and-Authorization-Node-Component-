'use strict'

const auth = require("./data/auth"),
passport = require('passport')

module.exports = function(router, service) {
    
    //router.get('permission', hasPermission)
    new Map([
        ['/homepage',(req,res) => {
            res.write('<a href="/comments">Comments</a> \n')
            res.write('<a href="/files">Files</a> \n')
            res.write('<a href="/books">Books</a>')
            res.end()
        }],
        ['/comments', (req,res)=>{
            (auth.hasPermissions(req))? res.end("User has permisions"):res.end("User doesn't have permissions")
        }],
        ['/files', (req,res)=>{
            (auth.hasPermissions(req))? res.end("User has permisions"):res.end("User doesn't have permissions")
        }],
        ['/books', (req,res)=>{
            auth.hasPermissions(req)? res.end("User has permisions"):res.end("User doesn't have permissions")
        }],
        ['/user', (req, res)=>{
            service.getUser(req.query.userId)
            .then(answer => setResponse(res, answer, 200))
            .catch(err => setResponse(res, err, 400))
        }],

        ['/google-login', passport.authenticate('google', {scope: ['profile']}), (req, res) =>{
            res.end(JSON.stringify(req.user))
        }],

        ['/backoffice', (req,res)=>{
            (auth.hasAdminPermissions(req))?res.end("User has permisions"):res.end("User doesn't have permissions")
        }]
    ]).forEach((handler,path)=>router.get(path, handler))
    
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
                    // handle this error better
                    res.redirect('/homepage')
                })
                setResponse(res, answer, 200)
            })
            .catch(err => setResponse(res, err, 400))
        }],
        
        ['/logout',(req,res)=>{
            req.logout()
            res.redirect('/homepage')
        }],
        
        ['/kerberos-login', (req,res)=>{}],
        
        ['/openid-login', passport.authenticate('google', {scope: ['profile']}), (req, res) =>{
            res.end(JSON.stringify(req.user))
        }],
        
        ['/register', (req, res) => service.register(req.body.username, req.body.password)
        .then(answer => setResponse(res, answer, 200))
        .catch(err => setResponse(res, err, 400))],
        
        ['/backoffice',(req,res)=>{
            (auth.hasAdminPermissions(req))? service.changeUserRole(req.user[0].id,req.body.user_id,req.body.newRole): res.end("User doesn't have permissions")
        }]
        
    ]).forEach((handler,path)=>router.post(path,handler))
        
    router.post('/saml-login', passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),(req,res)=>res.redirect('/homepage'))
    router.delete('/delete', (req, res) =>{})
    router.put('/change-user-status', (req, res) =>{})
    
    // set a basic response if request was executed succesfully
    function setResponse(res, answer, statusCode) {
        res.status = statusCode
        res.statusMessage = 'OK'
        res.headers = {
            'Content-type': 'application/json'
        }
        res.end(answer.toString())
    }
    
}