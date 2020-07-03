'use strict'

const rolesDal = require('./dals/roles-dal')
const usersDal = require('./dals/users-dal')

const userRoleDal = require('../resources/dals/users-roles-dal'),
    SUPER_USER = 'superuser',
    config=require('../common/config/config'),
    apiUtils=require('../common/util/api-utils'),
    errors=require('../common/util/errors/app-errors')

module.exports = {
    /**
     *
     * @param req
     * @param resp
     * @param next
     * @returns {Promise<*>}
     */
    check: async (req, resp, next) => {
        const resource = req.path.split("/")[2]
        const action = req.method

        const user=req.user
        var roles=[]

        if(user){
            roles= await usersDal.getUserRoles(user.id)
            roles=roles.map(role=>role["Roles.role"])
            if (roles.includes('admin')) {
                return next()
            }
        }
            roles.push("guest")

        for(let i=0;i<roles.length;i++){
            if(await config.rbac.can(roles[i],action,resource)){
                return next()
            }
        }
        return next(errors.Unauthorized)
    },

    getUserPermissions: async(req,resp,next) => {
        const user=req.user
        let permissions=[]
        var roles=[]

        if(user){
            roles= await usersDal.getUserRoles(user.id)
            roles=roles.map(role=>role["Roles.role"])
        }
            roles.push("guest")

        await Promise.all(roles.map( async role=>permissions.push( await config.rbac.getScope(role))))
        permissions=permissions.flat()
        return permissions
    }

}
