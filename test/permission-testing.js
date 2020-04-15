'use strict'

const 
app = require('../server/server'),
request = require('supertest'),
assert = require('assert');

// adminUser should be an admin with full permissions on the test database
const adminUser = {
    username: 'admin',
    password: '1234'
}

describe('[PERMISSION CRUD TESTING]', function() { 

    it('should create a new permission', function() {

    })

    it('should delete a permission', function() {
        
    })
})