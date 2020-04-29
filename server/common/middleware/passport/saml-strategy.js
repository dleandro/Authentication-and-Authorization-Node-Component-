'use strict'

const
fs = require('fs'),
passportUtils = require('../../util/passport-utils'),
SamlStrategy = new (require('passport-saml').Strategy)({ 
    
    callbackUrl: 'http://localhost:8082/authentication/login/saml/callback',  //redirect after sucessfull login
    entryPoint: 'https://authentication-node.eu.auth0.com/samlp/gkngnFEKD5tU9H6gaWR0UR7eqolioXaX',
    issuer: 'aa-node-component',
    cert:fs.readFileSync('../authentication-node.pem','utf-8'),
    privateCert: fs.readFileSync('../privateKey.pem', 'utf-8')
  },async function(profile, done) {
    let user=await passportUtils.findUserByIdp(profile.nameID)
    if(!user){
        user=await passportUtils.CreateUser(profile.nameID,'saml',profile['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],null)
        console.log(user)
    }
    done(null,user)
  })

module.exports = SamlStrategy 