'use strict'

const auth = require("./dal/auth"),
kerberos = require('kerberos')


module.exports = function(router, service) {
    
    //router.get('/', homepage)
    router.get('/comments', comments)
    router.get('/files', files)
    router.get('/books', books)
    
    router.get('permission', hasPermission)
    router.post('/login', login)
    router.post('/kerberos-login', kerberosLogin)
    router.post('/saml-login', samlLogin)
    router.post('/openid-login', openIdLogin)
    router.post('/register', register)
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
    
    // Simple username password login
    function login(req, res) {
        service.login(req.body.username, req.body.password, req)
        .then(answer => sendResponse(res, answer, 200))
        .catch(err => sendResponse(res, err, 400))
    }
    
    // Request service to authenticate using kerberos single sign on
    function kerberosLogin(req, res) {
        kerberos.KerberosClient()
    }
    
    
    function samlLogin(req, res) {
        // redirect to ask for an idp to give authentication
    }
    
    
    function openIdLogin(req, res) {
        
    }
    
    function register(req, res) {
        service.register(req.body.username, req.body.password)
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
}