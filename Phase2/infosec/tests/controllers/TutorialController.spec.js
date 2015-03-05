

// Importing Libraries for testing
var request = require('supertest');
var sinon = require('sinon'),
assert = require('assert');





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