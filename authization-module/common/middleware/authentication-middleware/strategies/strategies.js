const AzureAdOAuth2Strategy = require('passport-azure-ad-oauth2').Strategy,
    GoogleStrategy = require('passport-google-oauth20').Strategy,
    LocalStrategy = require('passport-local').Strategy,
    OpenIDStrategy = require('passport-openid').Strategy,
    SamlStrategy = require('passport-saml').Strategy,
    {azureAD,google,saml} = require('../../../config/config'),
    {checkProtocol,findCorrespondingUser,findUserByIdpOrCreate,createUser,addNotification,isBlackListed} = require('../../../util/passport-utils'),
    jwt = require('jsonwebtoken'),
    Idp = require('../../../../resources/dals/idps-dal'),
    errors = require('../../../errors/app-errors'),
    { User } = require('../../../../resources/sequelize-model'),
    usernameLink='http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress';

const strategyCallback= async (idpId, idpName, username, password,protocol,idp,done) => {
    let errorMessage = 'Protocol is not avaiable';
    if (await checkProtocol(protocol,idp)) {
        const user = await findUserByIdpOrCreate(idpId, idpName, username, password);
        if (!await isBlackListed(user.id)) {
            return done(null, user);
        }
        addNotification(user.id);
        errorMessage= 'User is BlackListed';
    }
    return done(null, false, {message: errorMessage});
};

const localStratBuilder = () =>new LocalStrategy(
    async function (username, password, done) {
        const user = await findCorrespondingUser(username);
        if (!user) {
            return done(null, false, { message: 'User isnt in database' });
        }
        if (await isBlackListed(user.id)) {
            addNotification(user.id);
            return done(null, false, { message: 'User is BlackListed' });
        }
        if (await Idp.getByUserId(user.id)) {
            return done(errors.IdpUserUnauthorized, false);
        }
        if (await User.correctPassword(password, user)) {
            return done(null, user);
        }

        // incorrect password
        return done(errors.incorrectPassword, false);
    }
);

const openIdStratBuilder = () => new OpenIDStrategy({
        returnURL: 'http://localhost:8082/homepage',
        realm: 'http://localhost:8082',
        clientID: '523982739771-2hkfdqls3uapvlf0c111i6qhnidfgt44.apps.googleusercontent.com',
        clientSecret: 'vs0R8tvgMv2w2rhuHtRPT9nK',
    }, (identifier, done)=> {/*function is empty cause ...*/}
);

const azureStratBuilder= () => new AzureAdOAuth2Strategy({
        clientID: azureAD.azure_client_id,
        clientSecret: azureAD.azure_client_secret,
        callbackURL: azureAD.callbackUrl,
        tenant:azureAD.tenant},
    (accessToken, refreshToken, params, profile, done)=> strategyCallback(params.id_token, 'azureAD', jwt.decode(params.id_token).email, 'null','oauth2','office365',done));

const googleStratBuilder = () =>new GoogleStrategy({clientID: google.google_client_id, clientSecret: google.google_client_secret, callbackURL: google.callbackUrl,},
    (accessToken, refreshToken, profile, done) =>strategyCallback(profile.id, 'google', profile.displayName, 'null','oauth2','google',done));


const samlStratBuilder = () => new SamlStrategy({callbackUrl:saml.callbackUrl, entryPoint:saml.entryPoint, issuer:saml.issuer, cert: saml.certificate, signatureAlgorithm:'sha256'},
    (profile, done)=>strategyCallback(profile.nameID, 'saml', profile[usernameLink], 'null','saml','office365',done));

module.exports = {
    localStrat:localStratBuilder,
    openIdStrat:openIdStratBuilder,
    azureStrat:azureStratBuilder,
    googleStrat:googleStratBuilder,
    samlStrat:samlStratBuilder,
};
