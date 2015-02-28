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

  Category.find({ name: { 'like': '%' }}).exec(function(err,categories){
   if(!err){
    return res.view('categories',{
     categoriesList: categories
    })
   }
  });
 }
 
};