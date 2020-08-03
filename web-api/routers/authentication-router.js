'use strict'

const errors = require('../common/errors/app-errors')

module.exports = function (apiUtils, authization) {

    const successCallback = async (req, res) => {

        if (req.isAuthenticated()) {

            process.env.WEBAPP ? res.redirect("http://localhost:3000/backoffice") : res.redirect("https://webapp-dot-auth-authorization.ew.r.appspot.com/backoffice")
        }
        else {
            process.env.WEBAPP ? res.redirect("http://localhost:3000") : res.redirect("https://webapp-dot-auth-authorization.ew.r.appspot.com")
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

    authenticationRouter.post('/local', authenticate.usingLocal,
        (req, res) => req.isAuthenticated() ?
            apiUtils.setResponse(res, 'Success', 200) :
            apiUtils.setResponse(res, errors.userNotAuthenticated.message, errors.userNotAuthenticated.status))

    authenticationRouter.post('/logout', authenticate.logout, successCallback)

    authenticationRouter.get('/azureAD', authenticate.usingOffice365);

    authenticationRouter.get('/azureAD/callback', authenticate.usingOffice365Callback, successCallback)

    authenticationRouter.get('/authenticated-user', (req, res) => req.user ?
        apiUtils.setResponse(res, req.user, 200) :
        apiUtils.setResponse(res, errors.userNotAuthenticated.message, errors.userNotAuthenticated.status)
    )

    return authenticationRouter

}