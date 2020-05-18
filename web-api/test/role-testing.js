'use strict'

const
    app = require('../server'),
    request = require('supertest'),
    assert = require('assert');

const role = {
    role: 'admin',
    parent_role: ''
}

var id
const contentTypeSetter = (request) => request.set('Accept', 'application/json').expect('Content-Type', /json/)

const getRole = (cb) => {
    contentTypeSetter(
        request(app)
            .get(`/role/${id}`))
        .expect(200)
        .end((err, resp) => {
            cb(err, resp)
        })

}

describe('[ROLE CRUD TESTING]', function () {

    it('should create a new role', function (done) {
        contentTypeSetter(
            request(app)
                .post('/role/')
                .send(role))
            .expect(200)
            .end((err, resp) => {
                id = resp.body.id

                assert.equal(resp.body.role, role.role)

                done()
            })

    })

    it('should get all roles', function (done) {
        contentTypeSetter(
            request(app)
                .get('/role/'))
            .expect(200)
            .end((err, resp) => {
                assert.equal(resp.body.length > 0, true)

                done()
            })

    })

    it('should get the created role', function (done) {

        getRole((err, resp) => {

            assert.equal(resp.body.role, role.role)

            done()

        })

    })

    it('should delete a role', function (done) {
        contentTypeSetter(
            request(app)
                .delete(`/role/${id}`))
            .expect(200)
            .end((err, resp) => {

                getRole((err, resp) => {
                    assert.equal(err != null, true)
                })

                done()
            })

    })
})
