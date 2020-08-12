
const
    GoogleStrategy = require('passport-google-oauth20').Strategy,
    errors = require('../../../errors/app-errors'),
    protocol = 'oauth2',
    idp='google',
    {google_client_id,google_client_secret,callbackUrl} = require('../../../config/config').google,
    {isBlackListed,findUserByIdp,checkProtocol,addNotification,createUser} = require('../../../util/passport-utils');

module.exports = () => {

    return new GoogleStrategy({
        clientID: google_client_id,
        clientSecret: google_client_secret,
        callbackURL: callbackUrl,
    },
        async function (accessToken, refreshToken, profile, done) {
            let error = errors.protocolIsNotActive;
            if (await checkProtocol(protocol,idp)) {
                //find or create user
                const user = await findUserByIdp(profile.id) || await createUser(profile.id, 'google', profile.displayName, 'Easteregg123');
                if (! await isBlackListed(user.id)){
                    return done(null,user);
                }
                addNotification(user.id);
                error = errors.userIsBlacklisted;
            }
            return done(error, false);
        }
    );
};
