
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



var MainController = require('../../api/controllers/MainController');


describe('MainController', function() {

  describe('#index', function() {
    it('Should render Index', function (done) {
      request(sails.hooks.http.app)
          .get('/')
          .expect(200)
          .end(function(err,res){
            done();
          });

      });
    });

});