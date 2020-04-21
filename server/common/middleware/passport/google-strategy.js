'use strict'

const 
GoogleStrategy = require('passport-google-oauth20').Strategy,
passportUtils = require('../../util/passport-utils')


const strategy = new GoogleStrategy({
    clientID: '523982739771-2hkfdqls3uapvlf0c111i6qhnidfgt44.apps.googleusercontent.com',
    clientSecret: 'vs0R8tvgMv2w2rhuHtRPT9nK',
    callbackURL: "http://localhost:8082/homepage"
},
function(accessToken, refreshToken, profile, cb) {
    passportUtils.findOrCreateUser({ username: profile.username, id: profile.id, password: 'blank' })
    .then(user => cb(null, user))
    .catch(err => cb(err, null))
}
)

module.exports = strategy