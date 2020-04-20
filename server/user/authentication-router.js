'use strict'

const passport = require('passport')

// this module contains all user authentication related endpoints
module.exports = function(apiUtils, data) {
    
    const authenticationRouter = require('express').Router()
    
    authenticationRouter.get(
        '/login/google',
        passport.authenticate('google', {scope: ['profile']}),
        (req, res) =>{
        res.end(JSON.stringify(req.user))
    })

    authenticationRouter.get(
        '/login/saml',
        passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
        (req, res) =>{
        res.end(JSON.stringify(req.user))
    })

    authenticationRouter.post(
        '/login', 
        (req, res)=> {
            data.getUser(req.body.username, req.body.password)
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
        }
    )

    authenticationRouter.post(
        '/logout', 
        (req,res)=>{
            req.logout()
            apiUtils.setResponse(res, "Logout succesfull", 200)
            res.redirect('/homepage')
        }
    )

    authenticationRouter.get(
        '/login/azureAD', 
        passport.authenticate('azure_ad_oauth2', { failureRedirect: '/login' }),
        (req, res) => {
            // Successful authentication, redirect home.
            res.redirect('/');
          }
    )
    
    return authenticationRouter
}