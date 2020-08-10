'use strict'

const setResponse = (res, answer, statusCode) => {
    console.log(answer)
    res.headers = {
        'Content-type': 'application/json'
    }
    res.status(statusCode).send(answer)
}

module.exports = {
    /**
     * set a basic response if request was executed succesfully
     * @param res
     * @param answer
     * @param statusCode
     */
    setResponse,

    promiseDataToResponse: (res, dataPromise, statusCode) => dataPromise
        .then(data => setResponse(res, data, statusCode || 200))
        .catch(err => setResponse(res, { err: err.message }, err.status))

}