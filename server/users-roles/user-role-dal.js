'use strict'

module.exports = function(dalUtils, errors) {
    
    const userHistoryDal = require('../user-history/user-history-dal') (dalUtils, errors)

    return {
        
        // database should return duplicate error to throw
        addUserRole: async (user, role) => {
            
            var result

            const query = {
                statement: 'INSERT INTO Users_Roles(user,role) VALUES (?,?);',
                description: "adding user_role",
                params: [user, role]
            }
            
            try {
                result = await dalUtils.executeQuery(query)             
                
            } catch (error) {
                throw error
            }
            
            try {
                
                //make sure user creation is registered on the user's history
                await registerUserHistory(result.insertId, moment().format(), "adding user role")
                
                return result
                
            } catch (error) {
                throw error
            }
            
        },
        
        getActiveRoles: async () => {
            
            const query = {
                statement: `Select * from User_Roles where active=1 AND end_date<${moment().format()}`,
                description: "getting active roles",
                params: []
            }
            
            try {
                return await dalUtils.executeQuery(query)             
                
            } catch (error) {
                throw error
            }
            
            
        },
        
        getUserActiveList: async (id) => {
            
            const query = {
                statement: `Select * from User_Roles where user_id=? AND active=1 AND end_date<${moment().format()}`,
                description: "getting user's active roles",
                params: [id]
            }

            try {
                return await dalUtils.executeQuery(query)            
                
            } catch (error) {
                throw error
            }
            
            
        },
        
        getUserRoles: async () => {
            
            const query = {
                statement: `Select * from User_Roles`,
                description: "getting all user roles",
                params: []
            }
            
            try {
                return await dalUtils.executeQuery(query)             
                
            } catch (error) {
                throw error
            }
            
        },

        getUserRolesById: async (id) => {
            
            const query = {
                statement: 'Select * from User_Roles where user_id=?',
                description: "getting all user's roles",
                params: [id]
            }
            
            try {
                return await dalUtils.executeQuery(query)             
                
            } catch (error) {
                throw error
            }
            
            
        }
        
        
    }

     // request userHistoryDal to insert the in the user s history the latest action executed
    async function registerUserHistory (userId, date, description) {
        try {
            
            userHistoryDal.addUserHistory(userId, date, description)
            
        } catch (error) {
            throw error                
        }
    }
}