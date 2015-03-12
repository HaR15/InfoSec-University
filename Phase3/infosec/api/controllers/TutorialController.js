/**
 * TutorialController
 *
 * @description :: Server-side logic for managing tutorials
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

 module.exports = {

  /* Returns the list of tutorials to 'tutorial/tutorialsList' view given a categoryId, 
  and category object, if successful */ 
  byCategory: function(req, res) {
    var categoryId = req.param('id');
    Tutorial.find({categoryId : categoryId}).exec(function(err, tutorials) {
      if (!err && tutorials.length > 0) {
        Category.findOne({id: categoryId}).exec(function(err, cat) {
          if(!err && cat) {
            return res.view('tutorial/tutorialsList', {
              tutorials: tutorials,
              category: cat
            });
          }
        });
      }else{                
        return res.view('tutorial/tutorialsList', {
          tutorials: [],
          category: null
        });
      }
    });
  },

  /* Returns a tutorial object to 'tutorial/tutorial' view given a tutorialId,
   if successful */ 
  byId: function(req, res) {
    var tutorialId = req.param('id');
    Tutorial.find({id : tutorialId}).exec(function(err, tutorials) {
      if (!err) {
        if (tutorials.length > 0) {
          return res.view('tutorial/tutorial', { tutorial: tutorials[0] });
        } else {
          return res.view('tutorial/tutorial', { tutorial: []})
        }

      }
    });
  },

  /* Returns a list of categories to 'admin/createTutorial' view ,
   if successful */ 
  createTutorial: function(req, res) {
    Category.find().exec(function(err, categories){
      if (!err) {
        return res.view('admin/createTutorial', { categories: categories });
      } else {
        return res.view('500');
      }
    });
  }



}
