'use strict'

module.exports = {
    /**
     * set a basic response if request was executed succesfully
     * @param res
     * @param answer
     * @param statusCode
     */
    setResponse: (res, answer, statusCode) => {
        console.log(answer)
        res.headers = {
            'Content-type': 'application/json'
        }
        res.status(statusCode)
        res.send(JSON.stringify(answer))
    },

    promiseDataToResponse: (res, dataPromise) => dataPromise
        .then(data => {

            if (!data || Array.isArray(data) && !data.length) {

                throw errors.noResponseFound

            }

            return apiUtils.setResponse(res, data, 200)

        })
        .catch(err => {
            apiUtils.setResponse(res, err.message, err.status)
        })


}
