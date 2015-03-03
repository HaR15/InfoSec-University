/**
 * FlashService
 *
 * @module      :: Service
 * @description :: Simple service to flash messages or alerts to user
 * @docs        :: http://sailsjs.org/#!documentation/services
 *
 */

module.exports = {
	
	// If we have a new success message, add that to flash list
	success: function(req, message) {
    	req.session.messages['success'].push(message);
  	},

  	// If we have a new warning message, add that to flash list
  	warning: function(req, message) { 
    	req.session.messages['warning'].push(message);
  	},   
  	
  	// If we have a new error message, add that to flash list
  	error: function(req, message) {
    	req.session.messages['error'].push(message);
  	}
}