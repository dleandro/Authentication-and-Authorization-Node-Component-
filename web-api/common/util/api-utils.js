'use strict'

module.exports = {
    
    
    // TODO: probably should have a function that calls auth module and checks if user is authenticated and that it had permissions
    
    // set a basic response if request was executed succesfully
    setResponse: (res, answer, statusCode) => {
        res.status(statusCode)
        res.statusMessage = 'OK'
        res.headers = {
            'Content-type': 'application/json'
        }
        res.send(answer)
    }

}