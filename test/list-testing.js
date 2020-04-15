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

describe('[LIST CRUD TESTING]', function() { 

    it('should create a new list', function() {
        
        request(app)

    })

    it('should delete a list', function() {

        
    })

    
})