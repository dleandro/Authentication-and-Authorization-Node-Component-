'use strict'

const passport = require('passport')

module.exports = {


    usingLocal: (req, res, next) => {

        passport.authenticate('local', { failWithError: true })
        next()
    },

    usingGoogle: (req, res, next) => {

        passport.authenticate('google', {scope: ['profile']})
        next()
    },

    usingGoogleCallback: () => {
        passport.authenticate('google')
    },

    usingSaml: (req, res, next) => {

        passport.authenticate('saml', { failureRedirect: '/', failureFlash: true })
        next()
    },

    usingSamlCallback: (req,res,next) => {
        passport.authenticate('saml')
        next()
    },

    usingOpenId: (req, res, next) => {
        next()
    },

    usingOffice365: (req, res, next) => {
        passport.authenticate('azure_ad_oauth2')
        next()
    },

    usingOffice365Callback: (req, res, next) => {
        passport.authenticate('azure_ad_oauth2')
        next()
    },

    logout: (req, res, next) => {
        req.logout()
        req.session.destroy()
        next()
    }

}