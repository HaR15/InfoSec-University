/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	login: function (req, res) {
		var bcrypt = require('bcrypt-nodejs');

		User.findOneByUser(req.body.user).exec(function (err, user) {
			if (err) {
				res.json({ error: 'DB error' }, 500)
			};

			if (user) {
				bcrypt.compare(req.body.password, user.password, function (err, match) {
					if (err){
						res.json({ error: 'Server error' }, 500);
					}

					// If the user/password provided is correct
					if (match) {
						req.session.user = user.id;
						res.json(user);
					}
					// Otherwise, user/password provided is incorrect
					else{
						if (req.session.user) {
							req.session.user = null;
						}
						res.json({ error: 'Invalid password' }, 400);
					}
				});
			}
			else {
				res.json({ error: 'User not found' }, 404);
			}
		});
	}
};
