'use strict'

const sequelizeErrorsMapper = require('../errors/sequelize-errors-mapper')

const simpleTryCatchAndRunFunctionFn = async (fnToRun, args) => {

    try {
        return Promise.resolve(await fnToRun(...args))
    } catch (error) {
        throw sequelizeErrorsMapper(error)
    }

}

module.exports = (fnToRun) => {

    return {
        all: () => simpleTryCatchAndRunFunctionFn(fnToRun),

        with: (...args) => simpleTryCatchAndRunFunctionFn(fnToRun, args)
    }
}