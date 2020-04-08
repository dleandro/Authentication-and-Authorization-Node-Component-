'use strict'

const 
app = require('../server/server'),
request = require('supertest'),
assert = require('assert');

// adminUser should be an admin with full permissions on the test database
// TODO: create test database before deployment to be able to use these users with no harm
const adminUser = {
    username: 'diogo',
    password: 'diogo'
}

const user = {
    username: 'test@test.pt',
    password: '1234'
}

const createUser = (cb) => {
    request(app)
    .post('/user')
    .send(user)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201)
    .end( (err, resp) => {
        cb(err, resp)
    })
}

const deleteUser = (id, cb) => {
    
    request(app)
    .delete(`/user/${id}`)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end( (err, resp) => { cb(err, resp) })
    
}

const getUser = (id, cb) => {
    
    request(app)
    .get(`/user?userId=${id}`)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end( (err, resp) => { cb(err, resp )})
}

describe('[USER CRUD TESTING]', function() {
    
    // ensure that user is authenticated to make sure the next tests won't fail due to lack of authentication
    before(function() {
        request(app)
        .post('/login')
        .send(adminUser)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end( (err, resp) => {  })
    }) 
    
    it('should get test user', function(done) {
        // create a user to show some results on get
        createUser( (err, resp) => {
            
            // get created resource
            getUser(1, (err, resp) => {
                assert.equal(user.username, resp.body.user.username);
            })
            
            // maintain state of the table by deleting created resource
            deleteUser(1, (err, resp) => done())
            
        })
        
    })
    
    it('should create test user', function(done) {
        
        createUser( (err, resp) => {
            
            assert.equal(user.username, resp.body.user.username);
            done()
        })
    })
    
    it('should delete test user', function(done) {
        
        // should make a get request to confirm the created user doesn't exist anymore
        deleteUser(1, (err, resp) => {
            
            getUser(1, (err, resp) => {

                assert.notEqual(err, null)
                done()            
            })
        })
    })
    
    it('should update test user´s username', function(done) {
        request(app)
        .put('/user/{1}/username')
        .send(user)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end( (err, resp) => { 
            assert.equal(user.username, resp.body.user.username);
            done()
        })
    })
    
    
    
    it('should update test user´s password', function(done) {
        request(app)
        .put('/user/{1}/password')
        .send(user)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end( (err, resp) => { 
            assert.equal(user.username, resp.body.user.username);
            done()
        })
    })
})