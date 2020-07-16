const apiUtils = require('./api-utils')

const promiseDataToResponse = (res, dataPromise) => dataPromise
    .then(data => {

        if (!data || Array.isArray(data) && !data.length) {

            throw errors.noResponseFound

        }

        return apiUtils.setResponse(res, data, 200)

    })
    .catch(err => {
        apiUtils.setResponse(res, err.message, err.status)
    });


exports.promiseDataToResponse = promiseDataToResponse        