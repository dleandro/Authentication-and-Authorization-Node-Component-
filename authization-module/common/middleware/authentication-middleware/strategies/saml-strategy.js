
const {callbackUrl,entryPoint,issuer,certificate} = require('../../../config/config').saml,
 SamlStrategy = require('passport-saml').Strategy,
    {checkProtocol,findUserByIdp,createUser,isBlackListed,addNotification,findUserByIdpOrCreate} = require('../../../util/passport-utils'),
    protocolName = 'Saml',usernameLink='http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress';

module.exports=()=>{
    return new SamlStrategy({callbackUrl, entryPoint, issuer, cert: certificate, signatureAlgorithm:'sha256'},
        async function (profile, done) {
            let errorMessage = 'Protocol is not avaiable';
            if (await checkProtocol(protocolName)) {
                const user = await findUserByIdpOrCreate(profile.nameID, 'saml', profile[usernameLink], 'null');
                if (!await isBlackListed(user.id)) {
                    return done(null, user);
                }
                addNotification(user.id);
                errorMessage= 'User is BlackListed';
            }
            return done(null, false, {message: errorMessage});
        });

}
