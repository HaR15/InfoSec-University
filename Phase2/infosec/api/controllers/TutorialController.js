/**
 * TutorialController
 *
 * @description :: Server-side logic for managing tutorials
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
  	index: function(req, res){

	  var cat = req.param('cat');

	  Tutorial.find({category : cat}).exec(function(err,tutorials){
	   if(!err){
	    return res.view('tutorial',{
	     tutorialsList: tutorials
	    })
	   }
	});
 }

};
