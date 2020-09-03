'use strict'

const
    app = require('../server'),
    request = require('supertest'),
    moment = require('moment'),
    links = require('../../links'),
    assert = require('assert');
const TEST_PASS = 'test'
const user = {
    username: TEST_PASS,
    password: TEST_PASS
}
const contentTypeSetter = (request) => request.set('Accept', 'application/json').expect('Content-Type', /json/)

var
    listId,
    userId

const list = (userId) => {

    return {

        user: userId,
        list: "BLACK",
        start_date: moment().format("YYYY-MM-DD HH:mm:ss"),
        end_date: moment().format("YYYY-MM-DD HH:mm:ss"),
        updater: userId,
        active: true

    }
}

function bodyLengthChecker(resp) {
    assert.equal(resp.body.length > 0, true)
    done()
}

describe('[LIST CRUD TESTING]', function () {

    before(function (done) {

        // create a user to associate with the list that will be tested
        contentTypeSetter(
            request(app)
                .post(links.users.USER_PATH)
                .send(user))
            .expect(201)
            .end((err, resp) => {

                userId = resp.body.id

                done()
            })
    })

    it('should create a new list', function (done) {
        contentTypeSetter(
            request(app)
                .post(links.lists.LIST_PATH)
                .send(list(userId)))
            .expect(201)
            .end((err, resp) => {

                listId = resp.body.id
                contentTypeSetter(
                    request(app)
                        .get(links.lists.USERS_ACTIVE_LISTS_PATH(userId)))
                    .expect(200)
                    .end((err, resp) => {

                        assert.equal(resp.body.id === listId, true)

                    })

                done()
            })

    })


    it('should get the previously created list', function (done) {


    })


    it('should get lists', function (done) {
        contentTypeSetter(
            request(app)
                .get(links.lists.LIST_PATH))
            .expect(200)
            .end((err, resp) => bodyLengthChecker(resp))

    })


    it('should get active lists', function (done) {
        contentTypeSetter(
            request(app)
                .get(links.lists.ACTIVE_LISTS_PATH))
            .expect(200)
            .end((err, resp) => bodyLengthChecker(resp))

    })

})

describe('[LIST UPDATE AND DELETE TESTING]', function () {


    it('should deactivate created list', function (done) {
        contentTypeSetter(
            request(app)
                .put(links.lists.LIST_DEACTIVATION_PATH(listId)))
            .expect(200)
            .end((err, resp) => {

                assert.equal(resp.body.affectedRows === 0, true)

                done()
            })
    })

    it('should delete a list', function (done) {
        contentTypeSetter(
            request(app)
                .delete(links.lists.SPECIFIC_LIST_PATH(listId)))
            .expect(200)
            .end((err, resp) => {

                getUsersActiveLists(
                    (err, resp) => {
                        assert.equal(resp.body.filter(list => list.id === listId).length === 0, true)
                    }
                )

                done()

            })

    })

    after(function () {
        contentTypeSetter(
            request(app)
                .delete(links.users.SPECIFIC_USER_PATH(userId)))
            .expect(200)
            .end((err, resp) => {
            })
    })


})
