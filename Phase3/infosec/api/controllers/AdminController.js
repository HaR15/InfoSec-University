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
          return res.view('admin/adminExercisesList', { exercises: exercises });

        // If error occurred, then return an empty array  
        }else{ 
          return res.view('admin/adminExercisesList', { exercises: [] });
        }
      });
  },

  // ACTION NAME: byId
  // USE: Action returns exercise by a given ID
  // PARAMETERS/INPUTS:
  //    id - ID of Exercise
  byExerciseId: function(req, res){

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
  },

  /*
    DESCRIPTION
      Returns the exercise editor view. If the `id` parameter of an exercise is 
      supplied, then the respective exercise can be edited and updated,
      otherwise hitting the save button will create a new exercise via the 
      saveExercise action.

    PARAMETERS
      id:   (optional) exercise id
  */
  exerciseEditor: function (req, res) {
    var exerciseId = req.param('id');
    
    // get a list of tutorials first
    Tutorial.find().exec( function (err, tutorials) {

      if(!err) {
        var locals = {
          edit: false,
          tutorials: tutorials 
        };

        // if an id was given, check if it exists
        if (exerciseId) {        
          Exercise.findOne({id:exerciseId}).exec(function (err, exercise) {
            if (!err) {
              if (exercise) { // exercise found, send locals for editing
                locals.edit = true;
                locals.exercise = exercise;
                return res.view("admin/exerciseEditor", locals);  
              
              } else { // given id was not found, send 404
                return res.view('404');
              }
            
            } else { // error occurred
              return res.serverError(err);
            }
          });

        } else { // id was not given, send locals for creating a new exercise
          return res.view("admin/exerciseEditor", locals);
        }

      // error occurred
      }else{ 
        return res.serverError(err);
      }
    });
  },

  /*
    DESCRIPTION
      Saves an exercise to the database. If an exercise `id` parameter is 
      supplied, then the changes to the respective exercise are saved, otherwise 
      a new exercise is created. If an bad id is supplied, nothing happens.

    PARAMETERS
      id:   (optional) exercise id
  */
  saveExercise: function (req, res) {
    var params = req.allParams();
    var exerciseEdit = {
      title: params.title,
      instructions: params.instructions,
      expected: params.expected,
      additionalCode: params.additionalCode,
      level: params.level,
      tutorialId: params.tutorialId
    };

    var saveAction;
    if (params.id) { // update exercise if an exercise id was given
      saveAction = Exercise.update({id:params.id}, exerciseEdit);
    
    } else { // save a newly created exercise
      saveAction = Exercise.create(exerciseEdit);
    }

    // return respective page
    saveAction.exec(function (err, exercise) {
      if (!err) {
        return res.redirect('/admin');  
      } else { // error occurred
        return res.serverError(err);
      }
    });
  }
}