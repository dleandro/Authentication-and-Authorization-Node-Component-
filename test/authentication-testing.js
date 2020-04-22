'use strict'

const 
app = require('../server/server'),
request = require('supertest'),
assert = require('assert');

const user = {
    username: '123',
    password: '123'
}

describe('[USER AUTHENTICATION TESTING]', function() { 
    
    it('should login using local strategy', function(done) {
        
        request(app)
        .post('/authentication/login')
        .send(user)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end( (err, resp) => { 
            assert.equal(err, null)
            done()
        })        
    })
})