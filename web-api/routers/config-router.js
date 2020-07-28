'use strict'

module.exports = function (apiUtils, authization) {
    const
        successCallback = (req, res, configChangeCB) => {
            configChangeCB(req.body)
            apiUtils.setResponse(res, { success: "changes made successfully" }, 200)
        }

    const
        configRouter = require('express').Router()
  

    configRouter.put('/database', (req, res) => successCallback(req, res, authization.configurations.changeDatabaseOptions))
    configRouter.put('/Google', (req, res) => successCallback(req, res, authization.configurations.changeGoogleAuthenticationOptions))
    configRouter.put('/AzureAD', (req, res) => successCallback(req, res, authization.configurations.changeAzureADAuthenticationOptions))
    configRouter.get('/rbac-opts', (req, res) => apiUtils.promiseDataToResponse(res, authization.configurations.getRbacOptions()))
    configRouter.get('/Google/options',(req,res)=>apiUtils.promiseDataToResponse(res, authization.configurations.getGoogleOptions()))
    configRouter.get('/AzureAD/options',(req,res)=>apiUtils.promiseDataToResponse(res, authization.configurations.getAzureAdOptions()))
    configRouter.get('/Saml/options',(req,res)=>apiUtils.promiseDataToResponse(res, authization.configurations.getSamlOptions()))
    

    return configRouter
}
