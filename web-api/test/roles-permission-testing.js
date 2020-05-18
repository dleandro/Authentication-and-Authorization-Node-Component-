'use strict'

const
    app = require('../server'),
    request = require('supertest'),
    assert = require('assert');
const contentTypeSetter = (request) => request.set('Accept', 'application/json').expect('Content-Type', /json/)

var
    roleId,
    permissionId

const role = {
        role: 'admin',
        parent_role: ''
    },
    rolesPermission = {
        role: roleId,
        permission: permissionId
    },
    permission = {
        method: "GET",
        path: "/user/1/username"
    }


describe('[ROLES PERMISSION CRUD TESTING]', function () {

    // create a role and a permission so we can associate them in a role_permission
    before(function () {
        contentTypeSetter(
            request(app)
                .post('/role/')
                .send(role))
            .expect(200)
            .end((err, resp) => {
                roleId = resp.body.id
            })
        contentTypeSetter(
            request(app)
                .post('/permission/')
                .send(permission))
            .expect(201)
            .end((err, resp) => {
                permissionId = resp.body.id
            })
    })

    it('should create a new roles permission', function (done) {
        contentTypeSetter(
            request(app)
                .post('/roles-permission/')
                .send(rolesPermission))
            .expect(201)
            .end((err, resp) => {
                assert.equal(resp.body.permission, permissionId)

                done()
            })

    })

    it('should delete a list', function (done) {
        contentTypeSetter(
            request(app)
                .delete(`/roles-permission`))
            .expect(200)
            .end((err, resp) => {

                assert(err == null, true)

                done()
            })

    })

})
