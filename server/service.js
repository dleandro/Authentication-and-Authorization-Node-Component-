'use strict'

module.exports = function(data) {
    return {
        // Checks if the user is in the database, if so it requests a login to be executed
        loginUser: async (username, password) => executeRequest( () => data.getUser([username, password]) ),
        
        // Creates a new entry on the database with given user parameters
        register: async (username, password) => executeRequest( () => data.insertUser([username, password]) ),
        
        // Get user with specific id
        getUserById: async (id) => executeRequest( () => data.getUserById([id]) ),
        
        getUserByEmail: async (email) => ( () => data.getUserByEmail([email]) ),
        
        changeUserRole: async (updater, id, newRole) => {
        },
        addRole : async (role)=>executeRequest(()=>data.role.addRole(role)),
        addList: async (user,list,start_date,end_date,updater)=>executeRequest(()=>data.list.addList(user,list,start_date,end_date,updater)),
        addPermission : async (method,path,description)=>executeRequest(()=>data.permission.addPermission(method,path,description)),
        addUsersRoles : async (user,role)=>executeRequest(()=>data.userRole.addUsersRoles(user,role)),
        addRolesPermission : async (role,permission)=>executeRequest(()=>data.rolePermission.addRolesPermission(role,permission)),
        deleteRole : async (role)=>executeRequest(()=>data.role.deleteRole(role)),
        deleteList: async (user)=>executeRequest(()=>data.list.deleteList(user,list,start_date,end_date,updater)),
        deletePermission : async (method,path)=>executeRequest(()=>data.permission.deletePermission(method,path))
    }
    
    
    async function executeRequest(functionToExecute) {
        try {

            return functionToExecute()

        } catch (err) {
            throw err
        }
    }
}