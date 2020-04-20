'use strict'

const 
app = require('../server/server'),
request = require('supertest'),
assert = require('assert');

const list = {

}

var id

describe('[LIST CRUD TESTING]', function() { 
    
    it('should create a new list', function() {
        
        request(app)
        .post('/list/')
        .send(list)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end( (err, resp) => { 
            id = resp.body.id
        })
        
    })
    
    it('should delete a list', function() {
        
        request(app)
        .delete(`/list/${id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end( (err, resp) => { cb(err, resp )})
        
    })
    
    it('should get a list', function() {
        
        request(app)
        .get('/list/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end( (err, resp) => { cb(err, resp )})
        
    })

    it('should get active lists', function() {
        
        request(app)
        .get('/list/active')
        .send(list)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end( (err, resp) => { cb(err, resp )})
        
    })

    it('should user´s active lists', function() {
        
        request(app)
        .get(`/list/active/user/${id}`)
        .send(list)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end( (err, resp) => { cb(err, resp )})
        
    })
    
})