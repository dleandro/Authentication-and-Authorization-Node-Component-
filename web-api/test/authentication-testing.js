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
const contentTypeSetter= (request) => request.set('Accept', 'application/json').expect('Content-Type', /json/)

describe('[USER AUTHENTICATION TESTING]', function() {

    before(function() {
        contentTypeSetter(
            request(app)
                .post(links.users.USER_PATH)
                .send(user))
            .expect(201)
            .end( (err, resp) => {
                userId = resp.body.id
            })

    })

    it('should login using local strategy', function(done) {
        contentTypeSetter(
            request(app)
                .post(links.users.LOCAL_LOGIN_PATH)
                .send(user))
            .expect(200)
            .end( (err, resp) => {
                assert.equal(resp.body.success !== undefined, true)
                done()
            })
    })

    after(function() {
        contentTypeSetter(
            request(app)
                .delete(links.users.SPECIFIC_USER_PATH(userId)))
            .expect(200)
            .end( (err, resp) => { })
    })
})
