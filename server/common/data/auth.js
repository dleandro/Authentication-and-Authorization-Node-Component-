'use strict'

module.exports={
    hasPermissions:(req)=> (!(!req.isAuthenticated() || req.user.role === 'B' || req.user.role === 'G')),
    hasAdminPermissions:(req)=> (!(!req.isAuthenticated() || req.user.role !== 'A'))
};