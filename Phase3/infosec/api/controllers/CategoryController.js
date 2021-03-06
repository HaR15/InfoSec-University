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
		Category.find().exec(function(err,categories){
			if(!err){
		  		return res.view('category/categories',{
		   			categories: categories
		  		});
		 	}else{
		 		return res.view('category/categories',{
		 			categories: []
		 		});
		 	}
		});
   },

	createCategory: function(req, res){
 		return res.view('admin/createCategory');
 	}
 
};