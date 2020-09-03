'use strict'

const
    app = require('../server'),
    request = require('supertest'),
    moment = require('moment'),
    assert = require('assert');
const TEST = '1234'
const user = {
    username: 'test@test.pt',
    password: TEST
}

const role = {
    role: 'admin',
    parent_role: ''
}
const contentTypeSetter = (request) => request.set('Accept', 'application/json').expect('Content-Type', /json/)

var id,
    userId,
    roleId

const userRoles = {
    user_id: userId,
    role_id: roleId,
    start_date: moment().format(),
    end_date: moment().format(),
    updater: userId,
    active: true
}

function bodyLengthChecker(resp) {
    assert.equal(resp.body.length > 0, true)
    done()
}

describe('[USERS ROLES CRUD TESTING]', function () {

    // create a user and a role to associate in a user role entry
    before(function () {
        contentTypeSetter(
            request(app)
                .post('/user')
                .send(user))
            .expect(201)
            .end((err, resp) => {
                userId = resp.body.id
            })
        contentTypeSetter(
            request(app)
                .post('/role/')
                .send(role))
            .expect(200)
            .end((err, resp) => {
                roleId = resp.body.id
            })

    })

    it('should create a new user role', function (done) {
        contentTypeSetter(
            request(app)
                .post('/users-roles/')
                .send(userRoles))
            .expect(200)
            .end((err, resp) => {
                id = resp.body.id

                assert.equal(resp.body.user_id, userId)

                done()

            })

    })

    // TDO: SHOULD DEACTIVATE USER ROLE

    it('should get all users roles', function (done) {
        contentTypeSetter(
            request(app)
                .get('/users-roles/'))
            .expect(200)
            .end((err, resp) => bodyLengthChecker(resp))

    })

    it('should get active user roles', function (done) {
        contentTypeSetter(
            request(app)
                .get('/users-roles/active')
                .send(list))
            .expect(200)
            .end((err, resp) => bodyLengthChecker(resp))

    })

    it('should get user´s active roles', function (done) {
        contentTypeSetter(
            request(app)
                .get(`/users-roles/active/user/${id}`)
                .send(list))
            .expect(200)
            .end((err, resp) => bodyLengthChecker(resp))

    })

    it('should delete a user role', function (done) {
        contentTypeSetter(
            request(app)
                .delete(`/users-roles/${id}`))
            .expect(200)
            .end((err, resp) => {
                assert(err == null, true)

                done()
            })

    })
})
