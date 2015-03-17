/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	// Define user and password for log in
	attributes: {
	  	username: {
	  		type: 'string', 
	  		unique: true,
	  		primaryKey: true,
	  		required: true
	  	},
	  	password: { 
	  		type: 'string',
	  		required: true,
	  		minLength: 8
	  	},
	  	completedExercises: {
	  		type: 'Array',
	  		defaultsTo: []
	  	} 
	},

	// Before creating our user, we will hash their password
  	beforeCreate: function (attrs, next) {
    	var bcrypt = require('bcrypt-nodejs');

	    bcrypt.genSalt(10, function(err, salt) {
	    	if (err) return next(err);

	    	bcrypt.hash(attrs.password, salt, null, function(err, hash) {
	        	if (err) return next(err);

	        	attrs.password = hash;
	        	next();
	      	});
	    });
	}
};

