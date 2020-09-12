'use strict'

const errors = require('../common/errors/app-errors')

module.exports = function (apiUtils, authization) {

    const successCallback = async (req, res) => {

        if (req.isAuthenticated()) {
            
            process.env.WEB_API_ENV === 'production' ? res.redirect(`${process.env.DEPLOYED_WEB_APP_HOME_PATH}/backoffice`) : res.redirect(`${process.env.LOCAL_WEB_APP_HOME_PATH}/backoffice`)
        }
        else {
            process.env.WEB_API_ENV === 'production' ? res.redirect(process.env.DEPLOYED_WEB_APP_HOME_PATH) : res.redirect(process.env.LOCAL_WEB_APP_HOME_PATH)
        }
    }

    const authenticate = authization.authenticate
    const userRoles = authization.userRole
    const bodyParser = require('body-parser');

    // this module contains all user authentication related endpoints

    const authenticationRouter = require('express').Router()

    authenticationRouter.get('/google', authenticate.usingGoogle)

    authenticationRouter.get('/google/callback', authenticate.usingGoogleCallback, successCallback)

    authenticationRouter.get('/saml', authenticate.usingSaml)

    authenticationRouter.post('/saml/callback', bodyParser.urlencoded({ extended: false }), authenticate.usingSamlCallback, successCallback)

    authenticationRouter.post('/local', authenticate.usingLocal,
        (req, res) => {
            console.log('logging in, req.isAuthenticated(): ', req.isAuthenticated())
            return req.isAuthenticated() ?
                apiUtils.setResponse(res, { res: 'success' }, 200) :
                apiUtils.setResponse(res, { err: errors.userNotAuthenticated.message }, errors.userNotAuthenticated.status)
        })

    authenticationRouter.post('/logout', authenticate.logout,
        (req, res) => apiUtils.setResponse(res, { res: 'success' }, 200))

    authenticationRouter.get('/azureAD', authenticate.usingOffice365);

    authenticationRouter.get('/azureAD/callback', authenticate.usingOffice365Callback, successCallback)

    authenticationRouter.get('/authenticated-user', (req, res) => req.user ?
        apiUtils.setResponse(res, req.user, 200) :
        apiUtils.setResponse(res, { err: errors.userNotAuthenticated.message }, errors.userNotAuthenticated.status)
    )

    authenticationRouter.get('/authenticated-user-roles', (req, res) =>
        apiUtils.promiseDataToResponse(res, userRoles.getUserActiveRoles(req.user.id))
    )


    return authenticationRouter

}