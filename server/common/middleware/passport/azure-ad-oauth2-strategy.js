'use strict'

const AzureAdOAuth2Strategy = require('passport-azure-ad-oauth2').Strategy,
config=require('../../config/config')


const strategy = new AzureAdOAuth2Strategy({
    clientID: config.azureAD.azure_client_id,
    clientSecret: config.azureAD.azure_client_secret,
    callbackURL: config.azureAD.callbackURL,
    tenant: config.azureAD.tenant
  },
  function (accessToken, refresh_token, params, profile, done) {
    // currently we can't find a way to exchange access token by user info (see userProfile implementation), so
    // you will need a jwt-package like https://github.com/auth0/node-jsonwebtoken to decode id_token and get waad profile
    var waadProfile = profile || jwt.decode(params.id_token);
  
    // this is just an example: here you would provide a model *User* with the function *findOrCreate*
    passportUtils.findOrCreateUser({ username: profile.username, id: profile.id, password: 'blank' })
    .then(user => cb(null, user))
    .catch(err => cb(err, null))
  })

  module.exports = strategy