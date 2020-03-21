'use strict'

const auth = require("./dal/auth")


module.exports = function(router, service, passport) {
    
    router.get('/homepage',homepage)
    router.get('/comments', comments)
    router.get('/files', files)
    router.get('/books', books)
    router.get('permission', hasPermission)
    router.get('/get-user',getUser)
    router.post('/login', login)
    router.post('/exec-login', executeLogin)
    router.post('/kerberos-login', kerberosLogin)
    router.post('/openid-login', openIdLogin)
    router.post('/register', register)
    router.post('/saml-login',passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),samlLogin)
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
    
    function hasPermission(req, res) {
        if(req.user.isAuthenticated()) {
            //req.user.role.permissions...
        }
    }
    
    function executeLogin(req, res) {
        req.login({
            username: username,
            password: password
        }, (err, result) => {
            
            // handle this error better
            res.redirect('/')
        })
    }
    
    // Simple username password login
    function login(req, res) {
        service.loginUser(req,res)
    }
    
    // Request service to authenticate using kerberos single sign on
    function kerberosLogin(req, res) {
    
    }
    

    
    
    function openIdLogin(req, res) {
        passport.authenticate('openid')
    }
    
    function register(req, res) {
        service.register(req.body.id,req.body.username, req.body.password)
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
            res.end(data.getBooks())
        }
        else{
            res.end("User doesn't have permissions")
        }
    }

    function getUser(req,res){

    }

    function samlLogin(req,res){
        res.redirect('/homepage')
    }
}