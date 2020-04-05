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
            service.getUserById(req.query.userId)
            .then(answer => setResponse(res, answer, 200))
            .catch(err => setResponse(res, JSON.parse(err.message).detail, JSON.parse(err.message).status))
        }],

        ['/google-login', passport.authenticate('google', {scope: ['profile']}), (req, res) =>{
            res.end(JSON.stringify(req.user))
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
        }],
        
        ['/register', (req, res) => 
        
            service.register(req.body.username, req.body.password)
            .then(answer => setResponse(res, answer, 201))
            .catch(err => setResponse(res, JSON.parse(err.message).detail, JSON.parse(err.message).status))
        ]
        
    ]).forEach((handler, path)=>router.post(path,handler))
        
    router.post('/saml-login', passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),(req,res)=>res.redirect('/homepage'))
    router.delete('/delete', (req, res) =>{})
    router.delete('/role',deleteRole)
    router.delete('/list',deleteList)
    router.delete('/permission',deletePermission)
    router.post('/role',addRole)
    router.post('/list',addList)
    router.post('/permission',addPermission)
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

    function addRole(req,res){
        service.addRole(req.body.role)
        .then(answer => setResponse(res, answer, 200))
            .catch(err => setResponse(res, JSON.parse(err).detail, JSON.parse(err).status))
    }

    function addList(req,res){
        service.addList(req.body.user,req.body.list,req.body.start_date,req.body.end_date,req.body.updater)
        .then(answer => setResponse(res, answer, 200))
            .catch(err => setResponse(res, JSON.parse(err).detail, JSON.parse(err).status))
    }

    function addPermission(req,res){
        service.addPermission(req.body.method,req.body.path,req.body.description)
        .then(answer => setResponse(res, answer, 200))
            .catch(err => setResponse(res, JSON.parse(err).detail, JSON.parse(err).status))
    }

    function deleteRole(req,res){
        service.deleteRole(req.body.role)
        .then(answer => setResponse(res, answer, 200))
            .catch(err => setResponse(res, JSON.parse(err).detail, JSON.parse(err).status))
    }

    function deleteList(req,res){
        service.deleteList(req.body.user,req.body.list,req.body.start_date,req.body.end_date,req.body.updater)
        .then(answer => setResponse(res, answer, 200))
            .catch(err => setResponse(res, JSON.parse(err).detail, JSON.parse(err).status))
    }

    function deletePermission(req,res){
        service.deletePermission(req.body.method,req.body.path,req.body.description)
        .then(answer => setResponse(res, answer, 200))
            .catch(err => setResponse(res, JSON.parse(err).detail, JSON.parse(err).status))
    }
    
}