'use strict'

const passport = require('passport'),
samlp=require('samlp'),
fs=require('fs')

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
        passport.authenticate('local', { failWithError: true }),
        (req, res, next) => {

            apiUtils.setResponse(res, "Login successful", 200)

        },
        (err, req, res, next) => {

            apiUtils.setResponse(res, err.message, 401)

        }
    )

    authenticationRouter.post(
        '/logout', 
        (req,res) => {
            req.logout()

            req.session = null

            apiUtils.setResponse(res, "Logout successful", 200)                    
        }
    )

    authenticationRouter.get(
        '/logout', 
        (req,res)=>{
            req.logout()
            req.session = null

            apiUtils.setResponse(res, "Logout successful", 200)   
        }
    )

    authenticationRouter.get('/login/azureAD', passport.authenticate('azure_ad_oauth2'));

    authenticationRouter.get( '/google/callback', 
    passport.authenticate( 'google', { 
        successRedirect: '/google/success',
        failureRedirect: '/google/failure'
}));

authenticationRouter.get('/login/saml',
  passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
  function(req, res) {
    res.redirect('/');
  }
);

const bodyParser = require('body-parser');

authenticationRouter.post('/login/saml/callback',
  bodyParser.urlencoded({ extended: false }),
  passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
  function(req, res) {
    res.redirect('/');
  }
);

authenticationRouter.get('/azureAD/callback', 
  passport.authenticate('azure_ad_oauth2', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/users/1');
  });
    
    return authenticationRouter
}