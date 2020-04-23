'use strict'

const 
GoogleStrategy = require('passport-google-oauth20').Strategy,
passportUtils = require('../../util/passport-utils'),
config=require('../../config/config')


const strategy = new GoogleStrategy({
    clientID: config.google.google_client_id,
    clientSecret: config.google.google_client_secret,
    callbackURL: config.google.callbackURL
},
function(accessToken, refreshToken, profile, cb) {
    passportUtils.findOrCreateUser({ username: profile.username, id: profile.id, password: 'blank' })
    .then(user => cb(null, user))
    .catch(err => cb(err, null))
}
)

module.exports = strategy