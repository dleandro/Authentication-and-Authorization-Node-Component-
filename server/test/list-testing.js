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

const list = {
    user_id: userId,
    LIST: 'blacklist',
    start_date: moment().format(),
    end_date: moment().format(),
    updater: userId,
    active: 1
}

const getUsersActiveLists = (cb) => {
    request(app)
    .get(links.lists.USERS_ACTIVE_LISTS_PATH(userId))
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end( (err, resp) => { 
       cb(err, resp)
    })
}

describe('[LIST CRUD TESTING]', function() { 

    // create a user to associate with the list that will be tested
    before(function () {
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
    
    it('should create a new list', function(done) {
        
        request(app)
        .post(links.lists.LIST_PATH)
        .send(list)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end( (err, resp) => { 
            listId = resp.body.id

            assert.equal(resp.body.LIST, list.LIST)

            done()
        })
        
    })

    //TODO: changeListStatus
    it('should deactivate created list', function(done) {
        
    })
    
    it('should get lists', function(done) {
        
        request(app)
        .get('/list/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end( (err, resp) => { 

            assert.equal(res.body.length > 0, true)

            done()
        })
        
    })
    
    it('should get active lists', function(done) {
        
        request(app)
        .get('/list/active')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end( (err, resp) => { 

            assert.equal(res.body.length > 0, true)

            done()
        })
        
    })
    
    it('should get user´s active lists', function(done) {

        getUsersActiveLists(
            (err, resp) => { 
           
                assert.equal(res.body.length > 0, true)
    
                done()
            }
        )
        
    })
    
    it('should delete a list', function(done) {
        
        request(app)
        .delete(`/list/${listId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end( (err, resp) => { 

            getUsersActiveLists(
                (err, resp) => {
                    assert.equal(resp.body.filter(list => list.id == listId).length == 0, true)
                }
            )

            done()

        })
        
    })

    after(function() {
        request(app)
        .delete(`/user/${userId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end( (err, resp) => { })
    })
})