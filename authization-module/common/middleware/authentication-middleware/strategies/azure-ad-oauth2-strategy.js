
const AzureAdOAuth2Strategy = require('passport-azure-ad-oauth2').Strategy,
    {azure_client_id,azure_client_secret,callbackUrl,tenant} = require('../../../config/config').azureAD,
    {checkProtocol,findCorrespondingUser,createUser,addNotification,isBlackListed} = require('../../../util/passport-utils'),
    protocol = 'oauth2',
    idp='office365',
    jwt = require('jsonwebtoken');

    module.exports = () => new AzureAdOAuth2Strategy({
        clientID: azure_client_id,
        clientSecret: azure_client_secret,
        callbackURL: callbackUrl,
            tenant,
    },
    async function (accessToken, refreshToken, params, profile, done) {
        let errorMessage = 'Protocol is not avaiable';
        if (await checkProtocol(protocol,idp)) {
            const mail = jwt.decode(params.id_token).email;
            //find or create user
            const user = await findCorrespondingUser(mail) || await createUser(params.id_token, 'azureAD', mail, 'Easteregg123');
            if (!await isBlackListed(user.id)) {
                return done(null, user);
            }
            addNotification(user.id);
            errorMessage = 'User is BlackListed';
        }
        return done(null, false, {message: errorMessage});
    });
