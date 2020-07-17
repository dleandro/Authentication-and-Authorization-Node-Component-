

module.exports = function (apiUtils, authization) {

    const
        sessionRouter = require('express').Router(),
        sessions = authization.sessions


    sessionRouter.get('/', (req, res) => apiUtils.promiseDataToResponse(res, sessions.get.all()))
    sessionRouter.get('/:id', (req, res) => apiUtils.promiseDataToResponse(res, sessions.getUserSessions.with(req.params.id)))



    return sessionRouter
}
