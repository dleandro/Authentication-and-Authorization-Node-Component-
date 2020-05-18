'use strict'

const
    LocalStrategy = require('passport-local').Strategy,
    passportUtils = require('../../../util/passport-utils')

const strategy = new LocalStrategy(
    async function (username, password, done) {
        const user = await passportUtils.findCorrespondingUser(username)

        if (await passportUtils.isBlackListed(user.id)) {
            passportUtils.addNotification(user.id)
            done(null, false, {message: 'User is BlackListed'})
            return
        }

        if (user.password === password) {
            done(null, user)
        }
    }
)


module.exports = strategy
