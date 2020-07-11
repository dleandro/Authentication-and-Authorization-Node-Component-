const errors = require('../common/errors/app-errors')

/**
 * this module contains all list related endpoints
 * @param apiUtils
 * @param authization
 * @returns {*|Router}
 */
module.exports = function (apiUtils, authization) {
    
    const routerUtils=require('./router-utils')
        const protocols = authization.protocols
    const protocolRouter = require('express').Router()

    protocolRouter.route('/')
    .get(getProtocols)

protocolRouter.get('/active', getActiveProtocols)

protocolRouter.put('/active',changeActive)

function getProtocols(req, res) {
    promiseDataToResponse(res, protocols.getAll())
}

function getActiveProtocols(req, res) {
    routerUtils.promiseDataToResponse(res, protocols.getAllActive(),apiUtils)
}

function changeActive(req,res){
    routerUtils.promiseDataToResponse(res,protocols.changeActive(req.body.protocol,req.body.active),apiUtils)
}
    
return protocolRouter
}
