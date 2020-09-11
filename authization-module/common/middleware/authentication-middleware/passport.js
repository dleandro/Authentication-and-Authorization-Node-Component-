
const
    passport = require('passport'),
    passportUtils = require('../../util/passport-utils'),
    config=require('../../config/config')

// Setup available authentication strategies
config.office365_saml && passport.use('office365_saml', require('./strategies/saml-strat')())
//passport.use('openid', require('./strategies/openId-strat')());
config.office365_oauth2 && passport.use('office365_oauth2', require('./strategies/azure-strat')());
config.google_oauth2 && passport.use('google_oauth2', require('./strategies/google-strat')());
passport.use('local', require('./strategies/local-strat')());

/**
 *
 * @param userRef - userId usually
 * @param done - callback
 */
const refToUser= (userRef, done)=> {
    passportUtils.findUser(userRef)
        .then(user => (user) ? done(null, user) : done('User unknown'));
};

/**
 *
 * @param user
 * @param done - callback
 */
const userToRef=(user, done)=> {
    done(null, user.id);
};

passport.serializeUser(userToRef);
passport.deserializeUser(refToUser);

module.exports = passport;
