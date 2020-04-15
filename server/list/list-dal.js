'use strict'

const moment = require('moment')


module.exports = function(dalUtils, errors) {

    return {

        addList: async (queryParams) => {

            
            try {
                return await dalUtils.executeQuery(`INSERT INTO Lists(user_id,list,start_date,end_date,updater) VALUES (?,?,?,?,?);`,
                queryParams)             

            } catch (error) {
                throw errors.errorExecutingQuery
            }
            
        
        },
        getLists: async () => {

            
            try {
                return await dalUtils.executeQuery(`Select * from List`,
                [user,list,start_date,end_date,updater])             

            } catch (error) {
                throw errors.errorExecutingQuery
            }
            
        
        },
        getActiveLists: async () => {

            
            try {
                return await dalUtils.executeQuery(`Select * from List where active=1 AND end_date<${moment().format()}`)             

            } catch (error) {
                throw errors.errorExecutingQuery
            }
            
        
        },
        getUserActiveList: async (queryParams) => {

            
            try {
                return await dalUtils.executeQuery(`Select * from List where user_id=? AND active=1 AND end_date<${moment().format()}`, queryParams)             

            } catch (error) {
                throw errors.errorExecutingQuery
            }
            
        
        }
    }

}