'use strict'

module.exports = function (apiUtils, authization) {

    const successCallback = async (req, res,next) =>{ 
        
            if(req.isAuthenticated()){
            res.redirect("http://localhost:3000/backoffice")
            }
            else{
             res.redirect("http://localhost:3000/") 
            }
    }
    const authenticate = authization.authenticate
    const bodyParser = require('body-parser');

    // this module contains all user authentication related endpoints

    const authenticationRouter = require('express').Router()

    authenticationRouter.get('/google', authenticate.usingGoogle)

    authenticationRouter.get('/google/callback', authenticate.usingGoogleCallback, successCallback)

    authenticationRouter.get('/saml', authenticate.usingSaml)

    authenticationRouter.post('/saml/callback', bodyParser.urlencoded({ extended: false }), authenticate.usingSamlCallback, successCallback)

    authenticationRouter.post('/local',authenticate.usingLocal, successCallback)

    authenticationRouter.post('/logout', authenticate.logout, successCallback)

    authenticationRouter.get('/azureAD', authenticate.usingOffice365);

    authenticationRouter.get('/azureAD/callback', authenticate.usingOffice365Callback, successCallback)

    authenticationRouter.get('/authenticated-user', (req, res) => apiUtils.setResponse(res, req.user || {}, 200)
)



    return authenticationRouter

}