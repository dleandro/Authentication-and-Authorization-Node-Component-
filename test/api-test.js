const 
app = require('../server/server'),
request = require('supertest')
assert = require('assert');

const user = {

}

describe('[USER CRUD TESTING]', function() {
  
  beforeAll((done) => {
    // Create user for later testing
    request(app)
    .post('/user')
    .send(user)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201)
    .end( (err, resp) => done())
  })
  
  it('should get user 1', function() {
    
    request(app)
    .get('/user?userId=1')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end( (err, resp) => {
      assert.equal(user.username, resp.body.user.username);
      done()
    })
    
  });
  
  it('should get user 1', function() {
    assert.equal([1, 2, 3].indexOf(4), -1);
  });
  
});