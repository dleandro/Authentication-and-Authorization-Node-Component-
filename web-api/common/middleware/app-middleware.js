const
    morgan = require('morgan'),
    apiUtils = require('../util/api-utils'),
    middlewareConfig = require('./middleware_config'),
    cors = require('cors');

// This module is used to setup middleware on the app passed as a parameter
module.exports = async function (app) {
    const corsOptions = {
        origin: [process.env.DEPLOYED_WEB_APP_HOME_PATH, process.env.LOCAL_WEB_APP_HOME_PATH],
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204,
        credentials: true,
    };

    // app configurations
    app.use(cors(corsOptions));
    // For request logging
    app.use(morgan('tiny'));

    try {
        // using authization module to setup authentication and authorization middleware
        const authization = await require('@authization/authization')
        //const authization = await require('../../../authization-module/authization')
            .setup({ app, db: middlewareConfig.db, rbac_opts: middlewareConfig.rbac_opts,https: false, strategies: middlewareConfig.local_strategies});

        app.use('/api', require('../../web-api')(authization));

    } catch (error) {
        console.error(error);
    }

    // error handler
    app.use((err, req, res, next) => {
        console.log(err);
        apiUtils.setResponse(res, { err: err.message }, err.status || 400);
    });

};
