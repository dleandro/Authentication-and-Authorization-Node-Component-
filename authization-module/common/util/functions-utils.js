'use strict'

const sequelizeErrorsMapper = require('../errors/sequelize-errors-mapper')

module.exports = (fnToRun) => {

    try {
        const res = fnToRun()
        return res
    } catch (error) {
        throw sequelizeErrorsMapper(error)
    }

}