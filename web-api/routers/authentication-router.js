'use strict'

module.exports = function (apiUtils) {

  const authization = require('../../authization-module/authization')
  const bodyParser = require('body-parser');

  // this module contains all user authentication related endpoints

  const authenticationRouter = require('express').Router()

  authenticationRouter.get(
    '/google',
    authization.authenticate.usingGoogle
  )

  authenticationRouter.get(
    '/google/callback',
    authization.authenticate.usingGoogleCallback,
    (req, res) => apiUtils.setResponse(res, { success: "login successful" }, 200)
  )

  authenticationRouter.get(
    '/saml',
    authization.authenticate.usingSaml,
  )

  authenticationRouter.post(
    '/saml/callback',
    bodyParser.urlencoded({ extended: false }),
    authization.authenticate.usingSamlCallback,
    (req, res) => apiUtils.setResponse(res, { success: "login successful" }, 200)

  )

  authenticationRouter.post(
    '/local',
    authization.authenticate.usingLocal,
    (req, res) => {
      apiUtils.setResponse(res, { success: "login successful" }, 200)
    }
  )

  authenticationRouter.post(
    '/logout',
    authization.authenticate.logout,
    (req, res, ) => apiUtils.setResponse(res, { success: "logout successful" }, 200)
  )

  authenticationRouter.get(
    '/azureAD',
    authization.authenticate.usingOffice365,
  );

  authenticationRouter.get(
    '/azureAD/callback',
    authization.authenticate.usingOffice365Callback,
    function (req, res) {
      apiUtils.setResponse(res, { success: "login successful" }, 200)
    }
  )

  return authenticationRouter

}