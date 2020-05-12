'use strict'

module.exports = function (apiUtils, authization) {

  const authenticate = authization.authenticate
  const bodyParser = require('body-parser');

  // this module contains all user authentication related endpoints

  const authenticationRouter = require('express').Router()

  authenticationRouter.get(
    '/google',
    authenticate.usingGoogle
  )

  authenticationRouter.get(
    '/google/callback',
    authenticate.usingGoogleCallback,
    (req, res) => apiUtils.setResponse(res, { success: "login successful" }, 200)
  )

  authenticationRouter.get(
    '/saml',
    authenticate.usingSaml,
  )

  authenticationRouter.post(
    '/saml/callback',
    bodyParser.urlencoded({ extended: false }),
    authenticate.usingSamlCallback,
    (req, res) => apiUtils.setResponse(res, { success: "login successful" }, 200)

  )

  authenticationRouter.post(
    '/local',
    authenticate.usingLocal,
    (req, res) => {
      apiUtils.setResponse(res, { success: "login successful" }, 200)
    }
  )

  authenticationRouter.post(
    '/logout',
    authenticate.logout,
    (req, res, ) => apiUtils.setResponse(res, { success: "logout successful" }, 200)
  )

  authenticationRouter.get(
    '/azureAD',
    authenticate.usingOffice365,
  );

  authenticationRouter.get(
    '/azureAD/callback',
    authenticate.usingOffice365Callback,
    function (req, res) {
      apiUtils.setResponse(res, { success: "login successful" }, 200)
    }
  )

  return authenticationRouter

}