'use strict'

const authization = require('../authization-module/authization')

// this module contains all user authentication related endpoints

const authenticationRouter = require('express').Router()

authenticationRouter.get(
  '/google',
  authization.authenticate.usingGoogle,
)

authenticationRouter.get(
  '/google/callback',
  authization.authenticate.usingGoogleCallback,
  (req, res) => apiUtils.setResponse(res, { success: "login successful" }, 200)
)

authenticationRouter.get(
  '/saml',
  authization.authenticate.usingSaml
)

authenticationRouter.post(
  '/saml/callback',
  authization.authenticate.usingSamlCallback,
  function (req, res) {
    (req, res) => apiUtils.setResponse(res, { success: "login successful" }, 200)
  }
)

authenticationRouter.post(
  '/local',
  authization.authenticate.usingLocal,
  (req, res, next) => {
    apiUtils.setResponse(res, "Success", 200)

  },
  (err, req, res, next) => {

    apiUtils.setResponse(res, err.message, err.status)

  }
)

authenticationRouter.post(
  '/logout',
  authization.authenticate.logout
)

authenticationRouter.get(
  '/logout',
  (req, res) => {

    req.session.destroy(function (err) { })

    req.logout()

    apiUtils.setResponse(res, "success :Logout successful", 200)

  }
)

//authenticationRouter.get('/login/azureAD', passport.authenticate('azure_ad_oauth2'));


/*
authenticationRouter.get(
  '/azureAD/callback',
  passport.authenticate('azure_ad_oauth2', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/users/1');
  }
)*/

module.exports = authenticationRouter
