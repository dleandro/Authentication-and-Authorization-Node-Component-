'use strict'

const
    apiUtils = require('../common/util/api-utils'),
    successCallback = (req, res, configChangeCB) => {
        configChangeCB(req.body)
        apiUtils.setResponse(res, { success: "changes made successfully" }, 200)
    }
module.exports = function (apiUtils, authization) {

    const
        configRouter = require('express').Router()

    configRouter.post('/callback-urls', (req, res) => successCallback({ body: req.body.callbackUrl}, res, authization.configurations.changeCallbackUrls))
    configRouter.put('/database', (req, res) => successCallback(req, res, authization.configurations.changeDatabaseOptions))
    configRouter.put('/google', (req, res) => successCallback(req, res, authization.configurations.changeGoogleAuthenticationOptions))
    configRouter.put('/azureAD', (req, res) => successCallback(req, res, authization.configurations.changeAzureADAuthenticationOptions))

    return configRouter
}
