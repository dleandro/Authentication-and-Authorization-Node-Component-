'use strict'

const 
app = require('../server'),
request = require('supertest'),
links = require('../../links'),
assert = require('assert');

const user = {
    username: '123',
    password: '123'
}

var userId

describe('[USER AUTHENTICATION TESTING]', function() { 
    
    before(function() {

        request(app)
        .post(links.users.USER_PATH)
        .send(user)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end( (err, resp) => { 
            userId = resp.body.id
        })

    })

    it('should login using local strategy', function(done) {
        
        request(app)
        .post(links.users.LOCAL_LOGIN_PATH)
        .send(user)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end( (err, resp) => { 
            assert.equal(err, null)
            done()
        })        
    })

    after(function() {
        request(app)
        .delete(links.users.SPECIFIC_USER_PATH(userId))
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end( (err, resp) => { })
    })
})