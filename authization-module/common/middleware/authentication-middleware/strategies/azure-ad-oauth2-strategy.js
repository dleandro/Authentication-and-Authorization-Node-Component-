'use strict'

const AzureAdOAuth2Strategy = require('passport-azure-ad-oauth2').Strategy,
    config = require('../../../config/config'),
    passportUtils = require('../../../util/passport-utils'),
    protocolName = 'AzureAD',
    jwt = require('jsonwebtoken');

const strategy = new AzureAdOAuth2Strategy({
        clientID: config.azureAD.azure_client_id,
        clientSecret: config.azureAD.azure_client_secret,
        callbackURL: config.azureAD.callbackURL,
        tenant: config.azureAD.tenant
    },
    async function (accessToken, refreshToken, params, profile, done) {

        if (!(await passportUtils.checkProtocol(protocolName))) {
            done(null, false, {message: 'Protocol is not avaiable'})
            return
        }

        var mail = jwt.decode(params.id_token).email

        var user = await passportUtils.findCorrespondingUser(mail)
        if (!user) {
            user = await passportUtils.createUser(params.id_token, 'azureAD', mail, null)
        }
        if (await passportUtils.isBlackListed(user.id)) {
            passportUtils.addNotification(user.id)
            done(null, false, {message: 'User is BlackListed'})
            return
        }
        done(null, user)
    })

module.exports = strategy