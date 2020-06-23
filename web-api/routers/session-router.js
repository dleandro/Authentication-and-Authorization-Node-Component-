module.exports = function (apiUtils, authization) {
    
    const
        sessionRouter = require('express').Router(),
        sessions=authization.sessions

        const promiseDataToResponse = (res, dataPromise) => dataPromise
        .catch(err => {
            throw errors.errorExecutingQuery
        })
        .then(data => {
            if (Array.isArray(data)) {
                if (data.length) {
                    return apiUtils.setResponse(res, data, 200)
                }
            } else {
                if (data) {
                    return apiUtils.setResponse(res, data, 200)
                }
            }
            throw errors.noResponseFound
        })
        .catch(err => {
            apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status)
        });


    sessionRouter.get('/', (req, res) => promiseDataToResponse(res, sessions.getAll()))
    sessionRouter.get('/:id', (req, res) => promiseDataToResponse(res, sessions.getUserSessions(req.params.id)))

    

    return sessionRouter
}
