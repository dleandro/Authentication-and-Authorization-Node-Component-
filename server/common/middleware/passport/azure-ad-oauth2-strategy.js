'use strict'

const AzureAdOAuth2Strategy = require('passport-azure-ad-oauth2').Strategy


const strategy = new AzureAdOAuth2Strategy({
    clientID: 'a36799d8-41a6-4d9e-a2f1-9c3c4ebf501a',
    clientSecret: '9A5A5C36932AB8F12562DE879A875',
    callbackURL: 'https://www.example.net/auth/azureadoauth2/callback',
    resource: '00000002-0000-0000-c000-000000000000',
    tenant: '8d5221b3-8bb0-4836-b9db-10d44210b270'
  },
  function (accessToken, refresh_token, params, profile, done) {
    // currently we can't find a way to exchange access token by user info (see userProfile implementation), so
    // you will need a jwt-package like https://github.com/auth0/node-jsonwebtoken to decode id_token and get waad profile
    var waadProfile = profile || jwt.decode(params.id_token);
  
    // this is just an example: here you would provide a model *User* with the function *findOrCreate*
    User.findOrCreate({ id: waadProfile.upn }, function (err, user) {
      done(err, user);
    });
  })

  module.exports = strategy