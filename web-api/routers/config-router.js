'use strict'

module.exports = function (apiUtils, authization) {
    const
        successCallback = (res) => {
            apiUtils.setResponse(res, { success: "changes made successfully" }, 200)
        }

    const
        configRouter = require('express').Router()

    configRouter.route('/oauth2/google')
        .get((req, res) => apiUtils.promiseDataToResponse(res, authization.configurations.getGoogleOauth2Options()))
        .put((req, res) => { authization.configurations.changeGoogleOauth2AuthenticationOptions(req.body.google_oauth2_opts); successCallback(res) })

    configRouter.route('/oauth2/office365')
        .get((req, res) => apiUtils.promiseDataToResponse(res, authization.configurations.getOffice365Oauth2Options()))
        .put((req, res) => { authization.configurations.changeOffice365Oauth2AuthenticationOptions(req.body.office365_oauth2_opts); successCallback(res) })

    configRouter.route('/saml/office365')
        .get((req, res) => apiUtils.promiseDataToResponse(res, authization.configurations.getOffice365SamlOptions()))
        .put((req, res) => { authization.configurations.changeOffice365SamlAuthenticationOptions(req.body.office365_saml_opts); successCallback(res) })

    configRouter.get('/rbac-opts', (req, res) => apiUtils.promiseDataToResponse(res, authization.configurations.getRbacOptions()))

    return configRouter
}
