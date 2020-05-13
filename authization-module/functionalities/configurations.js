'use strict'

const 
    config = require('../common/config/config')

// this module allows clients to change module configurations (database options, client ids and such)
module.exports = {

    // change database options
    changeDatabaseOptions: (newConfiguration) => {
        
        // set desired sgbd
        config.sgbd = newConfiguration.sgbd
        
        // delete sgbd field from newConfiguration parameter so it doesn't interfer with dabaseOptions later
        delete newConfiguration.sgbd

        // set new database_opts
        config.database_opts = newConfiguration

    },

    // change google qauthentication options
    changeGoogleAuthenticationOptions: (newConfiguration) => {

        config.google = newConfiguration

    },

    changeAzureADAuthenticationOptions: (newConfiguration) => {

        config.azureAD = newConfiguration

    }
}