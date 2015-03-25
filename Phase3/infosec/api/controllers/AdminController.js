/**
 * AdminController
 *
 * @description :: Server-side logic for managing tutorials
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

 module.exports = {

  viewDashboard: function(req, res) {
    Category.find().exec(function(err,categories){
      if(!err){
          return res.view('admin/dashboard',{
            categories: categories
          });
      }else{
        return res.view('admin/dashboard',{
          categories: []
        });
      }
    })
  },

   /* Returns the list of tutorials to 'admin/adminTutorials' view given a categoryId, 
  and category object, if successful */ 
  byCategory: function(req, res) {
    var categoryId = req.param('id');
    Tutorial.find({categoryId : categoryId}).exec(function(err, tutorials) {
      if (!err && tutorials.length > 0) {
        Category.findOne({id: categoryId}).exec(function(err, cat) {
          if(!err && cat) {
            return res.view('admin/adminTutorials', {
              tutorials: tutorials,
              category: cat
            });
          }
        });
      }else{                
        return res.view('admin/adminTutorials', {
          tutorials: [],
          category: null
        });
      }
    });
  }
}