

module.exports = function (apiUtils, authization) {
    
    const routerUtils=require('./router-utils')
    const
        sessionRouter = require('express').Router(),
        sessions=authization.sessions


    sessionRouter.get('/', (req, res) => routerUtils.promiseDataToResponse(res, sessions.getAll(),apiUtils))
    sessionRouter.get('/:id', (req, res) => routerUtils.promiseDataToResponse(res, sessions.getUserSessions(req.params.id),apiUtils))

    

    return sessionRouter
}
