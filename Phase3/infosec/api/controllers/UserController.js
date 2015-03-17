/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	updateExercisesCompleted: function (req, res, title){
		User.find({username : req.session.username}).exec(function (err, user) {
			if (err) {}
			else {
				// If the activity has not already been completed by this user
				// add to their list of completed activities
				console.log(user[0].completedExercises.indexOf(title))
				if (user[0].completedExercises.indexOf(title) == -1) {
					user[0].completedExercises.push(title);
					user[0].save(function(err) {});
				}
			}
		});
	},

	getLogin: function (req, res) {
		return res.view('user/login');
	},

	getSignup: function (req, res) {
		return res.view('user/signup');
	},

	getProfile: function (req, res) {
		return res.view('user/profile');
	},

	create: function(req, res) {
		// Search database for provided username
		User.find({username : req.param('username')}).exec(function (err, user) {
		    	if (err) {
		      		FlashService.error(req, 'There was an issue creating your account, please try again.');
					return res.redirect('/user/signup');
		    	}
		    	else {
				// Check if the provided username already exists
				if (user.length != 0) {
					FlashService.error(req, 'Username is already in use, please use another username.');
					return res.redirect('/user/signup');					
				}
				else {
					// If username does not exist, create their account and log them in
					User.create(req.body).exec(function(err, result){
						return sails.controllers.user.login(req, res);
					});
				}
			}
	  	});
	},

	login: function (req, res) {
		var bcrypt = require('bcrypt-nodejs');

		// Search database for provided username
		User.find({username : req.param('username')}).exec(function (err, user) {
			// If we cannot connect to database, return error
			if (err) {
				FlashService.error(req, 'Connection issue, please try again.');
				return res.redirect('/user/login');
			}

			// Check if we find a username matching the provided username
			if (user.length != 0) {
				// Encrypt plaintext provided password and compare this against the hashed password
				// stored in the database
				bcrypt.compare(req.param('password'), user[0].password, function (err, match) {

					// If there was an issue encrypting or comparing the passwords, return an error
					if (err){
						FlashService.error(req, 'There was an issue logging into your account, please try again.');
						return res.redirect('/user/login');
					}

					// If the username/password provided is correct, save user's id in the session
					// and return user's information to the UserView
					if (match) {
						req.session.userid = user[0].id;
						req.session.username = user[0].username;
						return res.redirect('/');
					}
					
					// Otherwise, username/password provided is incorrect so return an error
					else{
						if (req.session.user) {
							req.session.user = null;
						}

						FlashService.error(req, 'The password provided is incorrect, please try again.');
						return res.redirect('/user/login');
					}
				});
			}
			// Otherwise, provided username does not exist in database
			else {
				FlashService.error(req, 'Username provided does not exist, please try again.');
				return res.redirect('/user/login');
			}
		});
	},

	logout: function (req, res) {
		// Destroy user's session to log them out, then redirect to homepage
		req.session.destroy();
		return res.redirect('/');
	}

};
