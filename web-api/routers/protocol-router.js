
/**
 * this module contains all list related endpoints
 * @param apiUtils
 * @param authization
 * @returns {*|Router}
 */
module.exports = function (apiUtils, authization) {

    const protocols = authization.protocols
    const protocolRouter = require('express').Router()

    protocolRouter.route('/')
        .get(getProtocols)

    protocolRouter.get('/active', getActiveProtocols)

    protocolRouter.put('/active', changeActive)

    function getProtocols(req, res) {
        apiUtils.promiseDataToResponse(res, protocols.get.all())
    }

    function getActiveProtocols(req, res) {
        apiUtils.promiseDataToResponse(res, protocols.getActive.all())
    }

    function changeActive(req, res) {
        apiUtils.promiseDataToResponse(res, protocols.changeActive.with(req.body.protocol, req.body.active))
    }

    return protocolRouter
}
