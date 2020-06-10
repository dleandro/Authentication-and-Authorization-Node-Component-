'use strict'
const userRoleDal=require('../resources/dals/users-roles-dal'),
SUPER_USER='admin',
rbac=require('../common/middleware/rbac')

module.exports = {
    /**
     *
     * @param req
     * @param resp
     * @param next
     * @returns {Promise<*>}
     */
    check: async (req, resp, next) => {
        const user=req.user
        const resource=req.body.resource
        const action=req.body.action
        const roles=userRoleDal.getUserActiveRoles(user.id)
        if(roles.includes(SUPER_USER))return next();
        return roles.some(role=>rbac.can(role,action,resource))
    }

}
