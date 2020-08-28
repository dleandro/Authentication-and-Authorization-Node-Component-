module.exports = function (apiUtils, authization) {
    const users = authization.user,
    sessions=authization.sessions,
    profileRouter = require('express').Router()
    
    profileRouter.put('/password', updatePassword)
    profileRouter.get('/sessions', (req, res) => apiUtils.promiseDataToResponse(res, sessions.getUserSessions(req.user.id)))
    profileRouter.delete('/sessions',(req,res)=>apiUtils.promiseDataToResponse(res,sessions.delete(req.body.sid)))

    
    function updatePassword(req, res) {
        apiUtils.promiseDataToResponse(res, users.updatePassword(req.body.password, req.user.id), 201)
    }

    return profileRouter

}