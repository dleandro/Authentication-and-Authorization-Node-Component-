'use strict'

const auth = require("./data/auth")


module.exports = function(router, service, passport) {
    
    router.get('/homepage',homepage)
    router.get('/comments', comments)
    router.get('/files', files)
    router.get('/books', books)
    
    // endpoints
    //router.get('permission', hasPermission)
    router.get('/user', getUser)
    router.get('/backoffice', showBackoffice)
    router.post('/login', login)
    router.post('/logout',logout)
    router.post('/login-user', executeLogin)
    router.post('/kerberos-login', kerberosLogin)
    router.post('/openid-login', openIdLogin)
    router.post('/register', register)
    router.post('/saml-login', passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),samlLogin)
    router.post('/backoffice',changeUserRole)
    router.delete('/delete', deleteUser)
    router.put('/change-user-status', changeStatus)
    
    // set a basic response if request was executed succesfully
    function setResponse(res, answer, statusCode) {
        res.status = statusCode
        res.statusMessage = 'OK'
        res.headers = {
            'Content-type': 'application/json'
        }
        res.end(answer.toString())
    }
    
    
    function executeLogin(req, res) {
        req.login({
            id: req.body.user.id,
            username: req.body.user.username,
            password: req.body.user.password,
            role: req.body.user.role
            
        }, (err, result) => {
            
            // handle this error better
            res.redirect('/homepage')
        })
    }
    
    // Simple username password login
    function login(req, res) {
        service.loginUser(req,res)
        .then(answer => setResponse(res, answer, 200))
        .catch(err => setResponse(res, err, 400))
    }
    
    // Request service to authenticate using kerberos single sign on
    function kerberosLogin(req, res) {
        
    }
    
    function openIdLogin(req, res) {
        passport.authenticate('openid')
    }
    
    function register(req, res) {
        service.register(req.body.username, req.body.password)
        .then(answer => setResponse(res, answer, 200))
        .catch(err => setResponse(res, err, 400))
    }
    
    function deleteUser(req, res) {
        
    }
    
    function changeStatus(req, res) {
        
    }
    
    function homepage(req,res){
        res.write('<a href="/comments">Comments</a> \n')
        res.write('<a href="/files">Files</a> \n')
        res.write('<a href="/books">Books</a>')
        res.end()
    }
    
    function comments(req,res){
        if(auth.hasPermissions(req)){
            res.end("User has permisions")
        }
        else{
            res.end("User doesn't have permissions")
        }
    }
    
    function files(req,res){
        if(auth.hasPermissions(req)){
            res.end("User has permisions")
        }
        else{
            res.end("User doesn't have permissions")
        }
    }
    
    function books(req,res){
        if(auth.hasPermissions(req)){
            res.end("User has permisions")
        }
        else{
            res.end("User doesn't have permissions")
        }
    }
    
    function getUser(req, res){
        service.getUser(req.body.userId)
        .then(answer => setResponse(res, answer, 200))
        .catch(err => setResponse(res, err, 400))
    }
    
    function samlLogin(req,res){
        res.redirect('/homepage')
    }
    
    function logout(req,res){
        req.logout()
        res.redirect('/homepage')
    }
    
    function showBackoffice(req,res){
        if(auth.hasAdminPermissions(req)){
            res.end("User has permisions")
        }
        else{
            res.end("User doesn't have permissions")
        }
    }
    
    function changeUserRole(req,res){
        if(auth.hasAdminPermissions(req)){
            service.changeUserRole(req.user[0].id,req.body.user_id,req.body.newRole)
        }
        else{
            res.end("User doesn't have permissions")
        }
    }
}