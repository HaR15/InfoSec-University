/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	login: function (req, res) {
		var bcrypt = require('bcrypt-nodejs');

		// Search database for provided username
		User.find({username : req.param('username')}).exec(function (err, user) {
			// If we cannot connect to database, return error
			if (err) {
				return res.status(500).json({ error: 'DB error' });
			};

			// Check if we find a username matching the provided username
			if (user.length != 0) {
				// Encrypt plaintext provided password and compare this against the hashed password
				// stored in the database
				bcrypt.compare(req.param('password'), user[0].password, function (err, match) {

					// If there was an issue encrypting or comparing the passwords, return an error
					if (err){
						return res.status(500).json({ error: 'Server error' });
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
						return res.status(400).json({ error: 'Invalid password' });
					}
				});
			}
			// Otherwise, provided username does not exist in database
			else {
				return res.status(404).json({ error: 'User not found' });
			}
		});
	}
};
