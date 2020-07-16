

module.exports = function (apiUtils, authization) {

    const routerUtils = require('../common/util/router-utils')
    const
        sessionRouter = require('express').Router(),
        sessions = authization.sessions


    sessionRouter.get('/', (req, res) => routerUtils.promiseDataToResponse(res, sessions.get.all()))
    sessionRouter.get('/:id', (req, res) => routerUtils.promiseDataToResponse(res, sessions.getUserSessions.with(req.params.id)))



    return sessionRouter
}
