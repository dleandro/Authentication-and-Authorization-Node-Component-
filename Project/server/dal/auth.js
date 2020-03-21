'use strict'

module.exports={
   
    hasPermissions:function hasPermissions(req){
        if(!req.isAuthenticated()) return false
        return true
    }
}
