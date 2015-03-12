/**
 * flash
 *
 * @module      :: Policy
 * @description :: Simple policy to flash messages or alerts to user
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

	// Clear old messages from local that have already been displayed
	res.locals.messages = { success: [], error: [], warning: [] };

	
	if(!req.session.messages) {
		req.session.messages = { success: [], error: [], warning: [] };
		return next();
	}
	
	res.locals.messages = _.clone(req.session.messages);

	// Clear flash after updating local
	req.session.messages = { success: [], error: [], warning: [] };
	return next();
};