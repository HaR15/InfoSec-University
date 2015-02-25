/**
 * MainController
 *
 * @description :: Server-side logic for managing mains
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	home: function(req, res){
		return res.view('main/homepage',{
			layout: 'layouts/landing'
		});
	}
	
};

