/**
 * Category Controller
 *
 * @description :: Server-side logic for managing mains
 * @help        :: See http://links.sailsjs.org/docs/controllers
	These actions are implicitly created:
	 find
	 create
	 update 
	 delete
 */

module.exports = {

 index: function(req, res){

  var cat = req.param('cat');

  Tutorial.find({category : cat}).exec(function(err,tutorials){
   if(!err){
    return res.view('categories',{
     tutorials: tutorials
    })
   }
  });
 }
 
};