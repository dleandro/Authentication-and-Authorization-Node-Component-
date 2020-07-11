   
   
   const promiseDataToResponse= (res, dataPromise,apiUtils)=>dataPromise
        .then(data => {

            if (!data || Array.isArray(data) && !data.length) {

                throw errors.noResponseFound

            }

            return apiUtils.setResponse(res, data, 200)

        })
        .catch(err => {
            apiUtils.setResponse(res, err.detail, err.status)
        });


exports.promiseDataToResponse=promiseDataToResponse        