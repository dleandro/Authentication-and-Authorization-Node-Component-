'use strict'

const
data = require('../util/dal-paths'),
passport = require('passport'),
OpenIDStrategy = require('passport-openid').Strategy,
GoogleStrategy = require('passport-google-oauth20').Strategy,
AzureAdOAuth2Strategy=require('passport-azure-ad-oauth2').Strategy,
fs=require('fs')
   const SamlStrategy=new (require('passport-saml').Strategy)({ 
    
      callbackUrl: 'http://localhost:8082/login/callback',  //redirect after sucessfull login
      entryPoint: 'https://openidp.feide.no/simplesaml/saml2/idp/SSOService.php',
      issuer: 'passport-saml',
      decryptionPvk:fs.readFileSync('./privkey.pem')
    },function(profile, done) {
      findByEmail(profile.email, function(err, user) {
        if (err) {
          return done(err);
        }
        return done(null, user);
      });
    })

 const certificate=fs.readFileSync('./cacert.pem','utf-8')
  console.log(SamlStrategy.generateServiceProviderMetadata(certificate))
  
  passport.use(new GoogleStrategy({
    clientID: '523982739771-2hkfdqls3uapvlf0c111i6qhnidfgt44.apps.googleusercontent.com',
    clientSecret: 'vs0R8tvgMv2w2rhuHtRPT9nK',
    callbackURL: "http://localhost:8082/homepage"
  },
  function(accessToken, refreshToken, profile, cb) {
    findOrCreateUser({ username: profile.username, id: profile.id, password: 'blank' }, cb)
  }
  ))

  passport.use(new AzureAdOAuth2Strategy({
    clientID: 'a36799d8-41a6-4d9e-a2f1-9c3c4ebf501a',
    clientSecret: '9A5A5C36932AB8F12562DE879A875',
    callbackURL: 'https://www.example.net/auth/azureadoauth2/callback',
    resource: '00000002-0000-0000-c000-000000000000',
    tenant: '8d5221b3-8bb0-4836-b9db-10d44210b270'
  },
  function (accessToken, refresh_token, params, profile, done) {
    // currently we can't find a way to exchange access token by user info (see userProfile implementation), so
    // you will need a jwt-package like https://github.com/auth0/node-jsonwebtoken to decode id_token and get waad profile
    var waadProfile = profile || jwt.decode(params.id_token);
  
    // this is just an example: here you would provide a model *User* with the function *findOrCreate*
    User.findOrCreate({ id: waadProfile.upn }, function (err, user) {
      done(err, user);
    });
  }));
  
  passport.use(new OpenIDStrategy({
    returnURL: 'http://localhost:8082/homepage',
    realm: 'http://localhost:8082',
    clientID: '523982739771-2hkfdqls3uapvlf0c111i6qhnidfgt44.apps.googleusercontent.com',
    clientSecret: 'vs0R8tvgMv2w2rhuHtRPT9nK'
  },
  function(identifier, done) {
    //User.findOrCreate({ openId: identifier }, function(err, user) {
    //done(err, user);
    // });
  }
  ))
  
  passport.use(SamlStrategy)
    
    function refToUser(userRef, done) {
      findUser(userRef)
      .then(user => (user) ? done(null, user):done('User unknown'))
    }
    
    function userToRef(user, done) {
      done(null, user.id);
    }
    
    async function findUser(userId) {
      return data.user.getUserById(userId)
    }
    
    /*
    When Using identity providers you need this method to create an entry on the database for the user using the identity provider 
    If there is an entry for the user who is trying to authenticate we simply search its id on our database and return the specific user
    */
    async function findOrCreateUser(userToFindOrCreate, cb) {
      var user = await findUser(userToFindOrCreate)
      
      if (user) {
        cb(null, user)
      }
      
      data.user.insertUser(userToFindOrCreate.username, userToFindOrCreate.password)
      .then(user => cb(null, user))
      .catch(err => cb(err, null))
      
    }
    
    passport.serializeUser(userToRef);
    passport.deserializeUser(refToUser);
    
    module.exports = passport