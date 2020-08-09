
const
    LocalStrategy = require('passport-local').Strategy,
    {findCorrespondingUser,isBlackListed,addNotification} = require('../../../util/passport-utils'),
    Idp = require('../../../../resources/dals/idps-dal'),
    errors = require('../../../errors/app-errors'),
    { User } = require('../../../../resources/sequelize-model');

module.exports = () => new LocalStrategy(
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
