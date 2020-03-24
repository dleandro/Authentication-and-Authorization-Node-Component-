'use strict'

module.exports={
   
    hasPermissions:function hasPermissions(req){
        if(!req.isAuthenticated() || req.user[0].role=='B' || req.user[0].role=='G') return false
        return true
    },
    hasAdminPermissions:function hasAdminPermissions(req){
        if(!req.isAuthenticated() || req.user[0].role!='A') return false
        return true
    }
}
