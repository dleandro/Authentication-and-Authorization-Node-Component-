
/**
 * this module contains all list related endpoints
 * @param apiUtils
 * @param authization
 * @returns {*|Router}
 */
module.exports = function (apiUtils, authization) {

    const authTypes = authization.authTypes
    const authTypeRouter = require('express').Router()

    authTypeRouter.route('/')
        .get(getauthTypes)

    authTypeRouter.get('/active', getActiveauthTypes)

    authTypeRouter.patch('/active', changeActive)

    function getauthTypes(req, res) {
        apiUtils.promiseDataToResponse(res, authTypes.get())
    }

    function getActiveauthTypes(req, res) {
        apiUtils.promiseDataToResponse(res, authTypes.getActive())
    }

    function changeActive(req, res) {
        apiUtils.promiseDataToResponse(res, authTypes.changeActive(req.body.protocol, req.body.idp, req.body.active))
    }

    return authTypeRouter
}
