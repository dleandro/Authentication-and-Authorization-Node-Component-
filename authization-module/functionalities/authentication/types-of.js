'use strict'

const passport = require('passport')

module.exports = {


    usingLocal: (req, res, next) => {

        passport.authenticate('local', { failWithError: true })

    },

    usingGoogle: (req, res, next) => {

        passport.authenticate('google', {scope: ['profile']})

    },

    usingGoogleCallback: () => {
        passport.authenticate('google')
    },

    usingSaml: (req, res, next) => {

        passport.authenticate('saml', { failureRedirect: '/', failureFlash: true })

    },

    usingSamlCallback: () => {
        passport.authenticate('saml')
    },

    usingOpenId: (req, res, next) => {
        
    },

    usingOffice365: (req, res, next) => {
        passport.authenticate('azure_ad_oauth2')
    },

    usingOffice365Callback: (req, res, next) => {
        passport.authenticate('azure_ad_oauth2')
    },

    logout: (req, res, next) => {
        req.logout()
        req.session.destroy()
    }

}