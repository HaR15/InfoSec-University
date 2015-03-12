// INCOMPLETE

var User = require('../../api/models/User'),
    sinon = require('sinon'),
    assert = require('assert');

describe('The User Model', function () {
    describe('Before the user is created', function () {
        it ('password should be hashed with a generated salt', function (done) {
            User.beforeCreate({
                password: 'password'
            }, function (err, user) {
                assert.notEqual(user.password, 'password');
                done();
            });
        });
    });
});