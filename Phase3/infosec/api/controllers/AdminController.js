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
            return res.view('admin/adminTutorialsList', {
              tutorials: tutorials,
              category: cat
            });
          }
        });
      }else{                
        return res.view('admin/adminTutorialsList', {
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
          return res.view('admin/adminTutorial', { tutorial: tutorials[0] });
        } else {
          return res.view('admin/adminTutorial', { tutorial: []})
        }

      }
    });
  },

  // ACTION NAME: byTutorial
  // USE: Action returns all the exercises which correspond to a given tutorial
  // PARAMETERS/INPUTS:
  //    id - ID of Tutorial
  byTutorial: function(req, res){

    // Get ID (Tutorial ID) parameter from HTTP Request
    var tutorialId = req.param('id'); 

    // Find all exercises in the Exercises Collection by Tutorial id
    Exercise.find({ tutorialId: tutorialId }) 
      .exec(function(err, exercises){

        // If no error occurred, then return all the Exercises
        if(!err){ 
          return res.view('admin/exercises', { exercises: exercises });

        // If error occurred, then return an empty array  
        }else{ 
          return res.view('admin/exercises', { exercises: [] });
        }
      });
  },

  // ACTION NAME: byId
  // USE: Action returns exercise by a given ID
  // PARAMETERS/INPUTS:
  //    id - ID of Exercise
  byTutorialId: function(req, res){

    // Get ID (Tutorial ID) parameter from HTTP Request
    var exerciseId = req.param('id'); 

    // Find exercise by given ID
    Exercise.findOne({ id: exerciseId }) 
      .exec(function(err, exercise){

        // If no error occurred, then return the exercise
        if(!err){ 
          return res.view('admin/exercise', { exercise: exercise });

        // If error occurred or object not found then respond with 404  
        }else{ 
          console.log(err);
          return res.send(404);
        }
      });
  },

  /* Returns a list of categories to 'admin/createTutorial' view ,
   if successful */ 
  createTutorial: function(req, res) {
    Category.find().exec(function(err, categories){
      if (!err) {
        return res.view('admin/adminTutorialsList', { categories: categories });
      } else {
        return res.view('500');
      }
    });
  }
}