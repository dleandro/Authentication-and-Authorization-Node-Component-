'use strict'

const
    config = require('../common/config/config')

// this module allows clients to change module configurations (database options, client ids and such)
module.exports = {

    /**
     * @param callbackUrl 
     */
    changeCallbackUrls: (callbackUrl) => {
        config.google.callbackUrl = callbackUrl
        config.azureAD.callbackUrl = callbackUrl
        config.saml.callbackUrl = callbackUrl
        config.localCallbackUrl = callbackUrl
    },

    /**
     * change database options
     * @param newConfiguration
     */
    changeDatabaseOptions: (newConfiguration) => {
        // set desired sgbd
        config.sgbd = newConfiguration.sgbd
        // delete sgbd field from newConfiguration parameter so it doesn't interfer with dabaseOptions later
        delete newConfiguration.sgbd
        // set new database_opts
        config.database_opts = newConfiguration
    },

    /**
     * change google qauthentication options
     * @param newConfiguration
     */
    changeGoogleAuthenticationOptions: (newConfiguration) => {
        config.google = newConfiguration
    },
    /**
     *
     * @param newConfiguration
     */
    changeAzureADAuthenticationOptions: (newConfiguration) => {
        config.azureAD = newConfiguration
    }
}
