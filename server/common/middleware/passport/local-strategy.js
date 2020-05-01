'use strict'

const 
LocalStrategy = require('passport-local').Strategy,
passportUtils = require('../../util/passport-utils')

const strategy = new LocalStrategy(
    async function(username, password, done) {
        let user=await passportUtils.findCorrespondingUser(username, password)
            console.log("checkingBlacklisted")
            let isBlackListed=await passportUtils.isBlackListed(user.id)
            if(isBlackListed){
                return done(null,false,{message:'User is BlackListed'})
            }
            return done(null, user)
    }
    )
    
    
    module.exports = strategy