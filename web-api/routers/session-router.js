

module.exports = function (apiUtils, authization) {

    const
        sessionRouter = require('express').Router(),
        sessions = authization.sessions


    sessionRouter.get('/', (req, res) => apiUtils.promiseDataToResponse(res, sessions.get()))
    sessionRouter.get('/:id', (req, res) => apiUtils.promiseDataToResponse(res, sessions.getUserSessions(req.params.id)))
    sessionRouter.put('/:id',(req,res)=>apiUtils.promiseDataToResponse(res,sessions.update(req.body.sid,req.body.date)))
    sessionRouter.delete('/',(req,res)=>apiUtils.promiseDataToResponse(res,sessions.delete(req.body.sid)))

    return sessionRouter
}
