
// Importing Sails
var Sails = require('sails'),
sails;

// Importing Libraries for testing
var request = require('supertest');
var sinon = require('sinon'),
assert = require('assert');


// Executes before tests
before(function(done) {
  Sails.lift({
    // configuration for testing purposes
  }, function(err, server) {
    sails = server;
    if (err) return done(err);
    // here you can load fixtures, etc.
    done(err, sails);
  });
});

// Executes after tests
after(function(done) {
  // here you can clear fixtures, etc.
  sails.lower(done);
});

/****************************************************************************************/



var MainController = require('../../api/controllers/TutorialController');
var Category = require('../../api/models/Category');


describe('TutorialController', function() {
  describe('#byCategory', function() {
    it('Should render byCategory', function (done) {
      Category.findOne().exec(function(err, cat){
        if (!err) {
          request(sails.hooks.http.app)
            .get('/tutorial/byCategory?id=' + cat.id)
            .expect(200)
            .end(function(err,res){
              done();
            });
        };
      });
    });
  });
});