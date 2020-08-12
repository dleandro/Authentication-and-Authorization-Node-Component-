
const { callbackUrl, entryPoint, issuer, certificate } = require('../../../config/config').saml,
    errors = require('../../../errors/app-errors'),
SamlStrategy = require('passport-saml').Strategy,
    { checkProtocol, findUserByIdp, createUser, isBlackListed, addNotification, findUserByIdpOrCreate } = require('../../../util/passport-utils'),
    protocol = 'saml',
    idp = 'office365',
    usernameLink = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress';
module.exports = () => {
    return new SamlStrategy({ callbackUrl, entryPoint, issuer, cert: certificate, signatureAlgorithm: 'sha256' },

        async function (profile, done) {
            let error = errors.protocolIsNotActive;
            if (await checkProtocol(protocolName)) {
                const user = await findUserByIdpOrCreate(profile.nameID, 'saml', profile[usernameLink], 'null');
                if (!await isBlackListed(user.id)) {
                    return done(null, user);
                }
                addNotification(user.id);
                error = errors.userIsBlacklisted;
            }
            return done(error, false);
        });

}
