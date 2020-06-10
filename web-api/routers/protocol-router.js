const errors = require('../common/errors/app-errors')
/**
 * this module contains all list related endpoints
 * @param apiUtils
 * @param authization
 * @returns {*|Router}
 */
module.exports = function (apiUtils, authization) {

    const promiseDataToResponse = (res, dataPromise) => dataPromise
        .catch(err => {
            throw errors.errorExecutingQuery
        })
        .then(data => {
            if (Array.isArray(data)){
                if (data.length) {
                    return apiUtils.setResponse(res, data, 200)
                }
            } else {
               if (data){
                   return apiUtils.setResponse(res, data, 200)
               }
            }
            throw errors.noResponseFound
        })
        .catch(err => {
            apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status)
        });

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
    promiseDataToResponse(res, protocols.getAllActive())
}

function changeActive(req,res){
    promiseDataToResponse(res,protocols.changeActive(req.body.protocol,req.body.active))
}
    
return protocolRouter
}
