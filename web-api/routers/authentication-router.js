'use strict'
const SUCESS_MSG = "login successful";

module.exports = function (apiUtils, authization) {

  const successCallback = (req, res) => apiUtils.setResponse(res, { success: SUCESS_MSG }, 200)
  const authenticate = authization.authenticate
  const bodyParser = require('body-parser');

  // this module contains all user authentication related endpoints

  const authenticationRouter = require('express').Router()

  authenticationRouter.get('/google', authenticate.usingGoogle)

  authenticationRouter.get('/google/callback', authenticate.usingGoogleCallback, successCallback)

  authenticationRouter.get('/saml', authenticate.usingSaml)

  authenticationRouter.post('/saml/callback', bodyParser.urlencoded({ extended: false }), authenticate.usingSamlCallback, successCallback)

  authenticationRouter.post('/local', authenticate.usingLocal,successCallback)

  authenticationRouter.post('/logout', authenticate.logout,successCallback)

  authenticationRouter.get('/azureAD', authenticate.usingOffice365,);

  authenticationRouter.get('/azureAD/callback', authenticate.usingOffice365Callback,successCallback)

  return authenticationRouter

}
