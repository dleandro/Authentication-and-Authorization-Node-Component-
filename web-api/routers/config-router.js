'use strict'


module.exports = function(apiUtils, authization) {

    const
        configRouter = require('express').Router()
    
    configRouter.put('/database', (req, res) => {

        authization.configurations.changeDatabaseOptions(req.body)

        apiUtils.setResponse(res, { success: "changes made successfully" }, 200)
    })
    
    configRouter.put('/google', (req, res) => {

        authization.configurations.changeGoogleAuthenticationOptions(req.body)

        apiUtils.setResponse(res, { success: "changes made successfully" }, 200)
    })
    
    configRouter.put('/azureAD', (req, res) => {

        authization.configurations.changeAzureADAuthenticationOptions(req.body)

        apiUtils.setResponse(res, { success: "changes made successfully" }, 200)
    })

    return configRouter
}
