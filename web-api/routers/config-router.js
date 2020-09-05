'use strict'

module.exports = function (apiUtils, authization) {
    const
        successCallback = (res) => {
            apiUtils.setResponse(res, { success: "changes made successfully" }, 200)
        }

    const
        configRouter = require('express').Router()

    configRouter.route('/oauth2/google')
        .get((req, res) => apiUtils.promiseDataToResponse(res, authization.configurations.getGoogleOptions()))
        .put((req, res) => { authization.configurations.changeGoogleAuthenticationOptions(req.body.google_oauth2_opts); successCallback(res) })

    configRouter.route('/oauth2/office365')
        .get((req, res) => apiUtils.promiseDataToResponse(res, authization.configurations.getAzureAdOptions()))
        .put((req, res) => { authization.configurations.changeAzureADAuthenticationOptions(req.body.office365_oauth2_opts); successCallback(res) })

    configRouter.route('/saml/office365')
        .get((req, res) => apiUtils.promiseDataToResponse(res, authization.configurations.getSamlOptions()))
        .put((req, res) => { authization.configurations.changeSamlAuthenticationOptions(req.body.office365_saml_opts); successCallback(res) })

    configRouter.get('/rbac-opts', (req, res) => apiUtils.promiseDataToResponse(res, authization.configurations.getRbacOptions()))

    return configRouter
}
