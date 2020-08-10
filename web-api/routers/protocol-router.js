
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

    protocolRouter.patch('/active', changeActive)

    function getProtocols(req, res) {
        apiUtils.promiseDataToResponse(res, protocols.get())
    }

    function getActiveProtocols(req, res) {
        apiUtils.promiseDataToResponse(res, protocols.getActive())
    }

    function changeActive(req, res) {
        apiUtils.promiseDataToResponse(res, protocols.changeActive(req.body.protocol, req.body.idp, req.body.active))
    }

    return protocolRouter
}
