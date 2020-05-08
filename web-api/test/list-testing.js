'use strict'

const
    app = require('../server'),
    request = require('supertest'),
    moment = require('moment'),
    links = require('../../links'),
    assert = require('assert');

const user = {
    username: 'test',
    password: 'test'
}

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
        active: 1

    }
}

describe('[LIST CRUD TESTING]', function () {

    before(function (done) {

        // create a user to associate with the list that will be tested
        request(app)
            .post(links.users.USER_PATH)
            .send(user)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, resp) => {

                userId = resp.body.id

                done()
            })
    })

    it('should create a new list', function (done) {

        request(app)
            .post(links.lists.LIST_PATH)
            .send(list(userId))
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, resp) => {

                listId = resp.body.id

                request(app)
                .get(links.lists.USERS_ACTIVE_LISTS_PATH(userId))
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, resp) => {
    
                    assert.equal(resp.body.id == listId, true)
    
                })
    
                done()
            })

    })



    it('should get the previously created list', function (done) {

       
    })




    it('should get lists', function (done) {

        request(app)
            .get(links.lists.LIST_PATH)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, resp) => {

                assert.equal(resp.body.length > 0, true)

                done()
            })

    })




    it('should get active lists', function (done) {

        request(app)
            .get(links.lists.ACTIVE_LISTS_PATH)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, resp) => {

                assert.equal(resp.body.length > 0, true)

                done()
            })

    })

})

describe('[LIST UPDATE AND DELETE TESTING]', function () {


    it('should deactivate created list', function (done) {

        request(app)
            .put(links.lists.LIST_DEACTIVATION_PATH(listId))
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, resp) => {

                assert.equal(resp.body.affectedRows == 0, true)

                done()
            })
    })

    it('should delete a list', function (done) {

        request(app)
            .delete(links.lists.SPECIFIC_LIST_PATH(listId))
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, resp) => {

                getUsersActiveLists(
                    (err, resp) => {
                        assert.equal(resp.body.filter(list => list.id == listId).length == 0, true)
                    }
                )

                done()

            })

    })

    after(function () {
        request(app)
            .delete(links.users.SPECIFIC_USER_PATH(userId))
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, resp) => { })
    })


})