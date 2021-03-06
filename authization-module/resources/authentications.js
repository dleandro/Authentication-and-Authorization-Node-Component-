const passport = require('passport');
const { UserRoles } = require('./sequelize-model');

module.exports = {

    /**
     *
     * @param req
     * @param res
     * @param next
     */
    usingLocal: (req, res, next) => {
        passport.authenticate('local', { failWithError: true }, (err, user) => {
            if (!user || err) {
                next(err);
            } else {
                req.logIn(user, error => error ? next(error) : next());
            }
        })(req, res, next);

    },

    /**
     *
     * @param req
     * @param res
     * @param next
     */
    usingGoogle: (req, res, next) => {
        passport.authenticate('google_oauth2', { scope: ['profile'] })(req, res, next);
    },

    /**
     *
     * @param req
     * @param res
     * @param next
     */
    usingGoogleCallback: (req, res, next) => {
        passport.authenticate('google_oauth2', { failWithError: true }, function (err, user, info) {
            if (!user || err) {
                return next(err);
            }
            req.logIn(user, error => error? next(error):undefined);
            return next();
        })(req, res, next);
    },
    /**
     *
     * @param req
     * @param res
     * @param next
     */
    usingSaml: (req, res, next) => {
        passport.authenticate('office365_saml')(req, res, next);
    },
    /**
     *
     * @param req
     * @param res
     * @param next
     */
    usingSamlCallback: (req, res, next) => {
        passport.authenticate('office365_saml', { failWithError: true }, (err, user, info) => {
            if (!user || err) {
                return next(err);
            }
            req.logIn(user, error => error?next(error):undefined);
            return next();
        })(req, res, next);
    },

    /**
     *
     * @param req
     * @param res
     * @param next
     */
    usingOpenId: (req, res, next) => {},

    /**
     *
     * @param req
     * @param res
     * @param next
     */
    usingOffice365: (req, res, next) => {
        passport.authenticate('office365_oauth2')(req, res, next);
    },

    /**
     *
     * @param req
     * @param res
     * @param next
     */
    usingOffice365Callback: (req, res, next) => {
        passport.authenticate('office365_oauth2', { failWithError: true }, function (err, user, info) {
            if (!user || err) {
                return next(err);
            }
            req.logIn(user, error => error? next(error):undefined);
            return next();
        })(req, res, next);
    },
    /**
     *
     * @param req
     * @param res
     * @param next
     */
    logout: (req, res, next) => {
        req.logout();
        req.session.destroy(err => {
            if (err) {
                next(err);
            }
            next();
        });

    },
};
