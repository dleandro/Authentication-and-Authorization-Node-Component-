'use strict'

const
    app = require('../server'),
    request = require('supertest'),
    assert = require('assert');
const TEST = '1234'
const user = {
    username: 'test@test.pt',
    password: TEST
}
const contentTypeSetter = (request) => request.set('Accept', 'application/json').expect('Content-Type', /json/)

const getUser = (id, cb) => {
    contentTypeSetter(
        request(app)
            .get(`/user/${id}`))
        .expect(200)
        .end((err, resp) => {
            cb(err, resp)
        })
}

var userId

// TDO: IDP endpoints missing
describe('[USER CRUD TESTING]', function () {

    it('should create test user', function (done) {
        contentTypeSetter(
            request(app)
                .post('/user')
                .send(user))
            .expect(201)
            .end((err, resp) => {
                userId = resp.body.id
                assert.equal(resp.body.username, user.username)

                done()
            })

    })

    it('should get all users', function (done) {
        contentTypeSetter(
            request(app)
                .get('/user'))
            .expect(200)
            .end((err, resp) => {

                assert.equal(resp.body.length > 0, true)

                done()
            })

    })

    it('should get test user', function (done) {

        // get created resource
        getUser(userId, (err, resp) => {
            assert.equal(user.username, resp.body.username);
            done()
        })
    })


    it('should update test user´s username', function (done) {
        const user = {
            username: 'newUsername'
        }
        contentTypeSetter(
            request(app)
                .put(`/user/${userId}/username`)
                .send(user))
            .expect(200)
            .end((err, resp) => {
                assert.equal(user.username, resp.body.username);
                done()
            })

    })


    it('should update test user´s password', function (done) {
        const TEST = 'newPassword'
        const user = {
            password: TEST
        }
        contentTypeSetter(
            request(app)
                .put(`/user/${userId}/password`)
                .send(user))
            .expect(200)
            .end((err, resp) => {
                assert.equal(user.password, resp.body.password);
                done()
            })
    })

    it('should delete test user', function (done) {

        // should make a get request to confirm the created user doesn't exist anymore
        contentTypeSetter(
            request(app)
                .delete(`/user/${userId}`))
            .expect(200)
            .end((err, resp) => {
                getUser(userId, (err, resp) => {
                    assert.notEqual(err, null)
                    done()
                })
            })

    })

})
