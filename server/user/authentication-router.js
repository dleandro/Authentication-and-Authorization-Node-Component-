'use strict'

const passport = require('passport')

// this module contains all user authentication related endpoints
module.exports = function(apiUtils, data) {
    
    const authenticationRouter = require('express').Router()
    
    authenticationRouter.get(
        '/login/google',
        passport.authenticate('google', {scope: ['profile']})
    )

    authenticationRouter.get(
        '/login/saml',
        passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
        (req, res) =>{
        res.end(JSON.stringify(req.user))
    })

    authenticationRouter.post(
        '/login', 
        passport.authenticate('local', { successRedirect: '/', failureRedirect: '/authentication/login' })
    )

    authenticationRouter.post(
        '/logout', 
        (req,res)=>{
            req.logout()
            apiUtils.setResponse(res, "Logout succesfull", 200)
            res.redirect('/homepage')
        }
    )

    authenticationRouter.get('/login/azureAD', passport.authenticate('azure_ad_oauth2'));

    authenticationRouter.get( '/google/callback', 
    passport.authenticate( 'google', { 
        successRedirect: 'google/success',
        failureRedirect: 'google/failure'
}));

authenticationRouter.get('/azureAD/callback', 
  passport.authenticate('azure_ad_oauth2', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
    
    return authenticationRouter
}