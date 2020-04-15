'use strict'

const
data = require('../util/dal-paths'),
passport = require('passport'),
SamlStrategy = require('passport-saml').Strategy,
OpenIDStrategy = require('passport-openid').Strategy,
GoogleStrategy = require('passport-google-oauth20').Strategy

/* LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
  ));
  */
  
  passport.use(new GoogleStrategy({
    clientID: '523982739771-2hkfdqls3uapvlf0c111i6qhnidfgt44.apps.googleusercontent.com',
    clientSecret: 'vs0R8tvgMv2w2rhuHtRPT9nK',
    callbackURL: "http://localhost:8082/homepage"
  },
  function(accessToken, refreshToken, profile, cb) {
    findOrCreateUser({ username: profile.username, id: profile.id, password: 'blank' }, cb)
  }
  ))
  
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
  
  passport.use(new SamlStrategy(
    {
      path: '/login/callback',  //redirect after sucessfull login
      entryPoint: 'https://openidp.feide.no/simplesaml/saml2/idp/SSOService.php',
      issuer: 'passport-saml'
    },
    function(profile, done) {
      console.log("saml strategy")
      // var user = service.getUserByEmail(profile.email)
      //return user===null|| user===undefined ? done(err)
      findByEmail(profile.email, function(err, user) {
        if (err) {
          return done(err);
        }
        return done(null, user);
      });
    })
    );
    
    function refToUser(userRef, done) {
      findUser(userRef)
      .then(user => (user) ? done(null, user):done('User unknown'))
    }
    
    function userToRef(user, done) {
      done(null, user.id);
    }
    
    async function findUser(userId) {
      return data.user.getUserById([userId])
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
      
      data.user.insertUser([userToFindOrCreate.username, userToFindOrCreate.password])
      .then(user => cb(null, user))
      .catch(err => cb(err, null))
      
    }
    
    passport.serializeUser(userToRef);
    passport.deserializeUser(refToUser);
    
    module.exports = passport