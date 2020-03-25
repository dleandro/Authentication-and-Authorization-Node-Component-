'use strict'

module.exports={
    hasPermissions:(req)=> (!(!req.isAuthenticated() || req.user[0].role === 'B' || req.user[0].role === 'G')),
    hasAdminPermissions:(req)=> (!(!req.isAuthenticated() || req.user[0].role !== 'A'))
};