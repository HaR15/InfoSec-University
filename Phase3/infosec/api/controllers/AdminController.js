/**
 * AdminController
 *
 * @description :: Server-side logic for managing tutorials
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

 module.exports = {

  /*
    Returns the admin dashboard view.
  */
  dashboard: function (req, res) {
    Category.find().exec(function (err, categories) {
      if (err) {
        return res.serverError(JSON.stringify(err));
      } else {
        Tutorial.find().exec(function (err, tutorials) {
          if (err) {
            res.serverError(JSON.stringify(err));
          } else {
            Exercise.find().exec(function (err, exercises) {
              if (err) {
                res.serverError(JSON.stringify(err));
              } else {
                locals = {
                  categories: categories,
                  tutorials: tutorials,
                  exercises: exercises
                };
                return res.view('admin/dashboard', locals);
              }
            });
          }
        });
      }
    });
  },

  /*
    DESCRIPTION
      Returns the category editor view. If the `id` parameter of a category is 
      supplied, then the respective category can be edited and updated,
      otherwise hitting the save button will create a new category via the 
      saveCategory action.

    PARAMETERS
      id:   (optional) category id
  */
  categoryEditor: function (req, res) {
    var categoryId = req.param('id');
    
    var locals = {
      edit: false,
    };

    if (categoryId) { // if an id was given, check if it exists
      Category.findOne({id:categoryId}).exec(function (err, category) {
        if (err) {  // error occurred
          return res.serverError(JSON.stringify(err));
        
        } else if (Category) { // category found, send locals for editing
          locals.edit = true;
          locals.category = category;
          return res.view("admin/categoryEditor", locals);  
        
        } else { // given id was not found, send 404
          return res.view('404');
        }
      });

    } else { // id was not given, send locals for creating a new category
      return res.view("admin/categoryEditor", locals);
    }
  },

  /*
    DESCRIPTION
      Saves an category to the database. If a category `id` parameter is 
      supplied, then the changes to the respective category are saved, otherwise 
      a new category is created. If an bad id is supplied, nothing happens.

    PARAMETERS
      id:   (optional) category id
  */
  saveCategory: function (req, res) {
    var params = req.allParams();
    var categoryEdit = {
      title: params.title,
      brief: params.brief,
      description: params.description,
    };

    var saveAction;
    if (params.id) { // update exercise if an exercise id was given
      saveAction = Category.update({id:params.id}, categoryEdit);
    
    } else { // save a newly created exercise
      saveAction = Category.create(categoryEdit);
    }

    // return respective page
    saveAction.exec(function (err, category) {
      if (err) { // error occurred
        return res.serverError(JSON.stringify(err));
      } else {
        FlashService.success(req, 'Saved category!');
        return res.redirect('/admin');  
      }
    });
  },

  /*
    DESCRIPTION
      Deletes the specified category.

    PARAMENTERS
      id:   (required) category id
  */
  deleteCategory: function (req, res) {
    var categoryId = req.param('id');
    Category.destroy({id:categoryId}).exec(function (err, deleted) {
      if (err) {
        return res.serverError(JSON.stringify(err));

      } else if (deleted.length) {
        FlashService.success(req, 'Successfully deleted category!');
        return res.redirect('/admin');

      } else {
        return res.view('404');
      }
    });
  },

  /*
    DESCRIPTION
      Returns the tutorial editor view. If the `id` parameter of a tutorial is 
      supplied, then the respective tutorial can be edited and updated,
      otherwise hitting the save button will create a new tutorial via the 
      saveTutorial action.

    PARAMETERS
      id:   (optional) tutorial id
  */
  tutorialEditor: function (req, res) {
    var tutorialId = req.param('id');
    
    // get a list of Categories first
    Category.find().exec( function (err, categories) {

      if(err) { // error occurred
        return res.serverError(JSON.stringify(err));

      }else{
        var locals = {
          edit: false,
          categories: categories 
        };

        if (tutorialId) { // if an id was given, check if it exists
          Tutorial.findOne({id:tutorialId}).exec(function (err, tutorial) {
            if (err) {  // error occurred
              return res.serverError(JSON.stringify(err));
            
            } else {
              if (tutorial) { // tutorial found, send locals for editing
                locals.edit = true;
                locals.tutorial = tutorial;
                return res.view("admin/tutorialEditor", locals);  
              
              } else { // given id was not found, send 404
                return res.view('404');
              }
            }
          });

        } else { // id was not given, send locals for creating a new tutorial
          return res.view("admin/tutorialEditor", locals);
        }
      }
    });
  },

  /*
    DESCRIPTION
      Saves an tutorial to the database. If an tutorial `id` parameter is 
      supplied, then the changes to the respective tutorial are saved, otherwise 
      a new tutorial is created. If an bad id is supplied, nothing happens.

    PARAMETERS
      id:   (optional) tutorial id
  */
  saveTutorial: function (req, res) {
    var params = req.allParams();
    var tutorialEdit = {
      categoryId: params.categoryId,
      title: params.title,
      brief: params.brief,
      description: params.description
    };

    var saveAction;
    if (params.id) { // update tutorial if an tutorial id was given
      saveAction = Tutorial.update({id:params.id}, tutorialEdit);
    
    } else { // save a newly created tutorial
      saveAction = Tutorial.create(tutorialEdit);
    }

    // return respective page
    saveAction.exec(function (err, tutorial) {
      if (err) { // error occurred
        return res.serverError(JSON.stringify(err));
      } else {
        FlashService.success(req, 'Saved tutorial!');
        return res.redirect('/admin');  
      }
    });
  },

  /*
    DESCRIPTION
      Deletes the specified tutorial.

    PARAMENTERS
      id:   (required) tutorial id
  */
  deleteTutorial: function (req, res) {
    var tutorialId = req.param('id');
    Tutorial.destroy({id:tutorialId}).exec(function (err, deleted) {
      if (err) {
        return res.serverError(JSON.stringify(err));

      } else if (deleted.length) {
        FlashService.success(req, 'Successfully deleted tutorial!');
        return res.redirect('/admin');

      } else {
        return res.view('404');
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

      if(err) { // error occurred
        return res.serverError(JSON.stringify(err));

      }else{
        var locals = {
          edit: false,
          tutorials: tutorials 
        };

        if (exerciseId) { // if an id was given, check if it exists
          Exercise.findOne({id:exerciseId}).exec(function (err, exercise) {
            if (err) {  // error occurred
              return res.serverError(JSON.stringify(err));
            
            } else {
              if (exercise) { // exercise found, send locals for editing
                locals.edit = true;
                locals.exercise = exercise;
                return res.view("admin/exerciseEditor", locals);  
              
              } else { // given id was not found, send 404
                return res.view('404');
              }
            }
          });

        } else { // id was not given, send locals for creating a new exercise
          return res.view("admin/exerciseEditor", locals);
        }
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
      if (err) { // error occurred
        return res.serverError(JSON.stringify(err));
      } else {
        FlashService.success(req, 'Saved exercise!');
        return res.redirect('/admin');  
      }
    });
  },

  /*
    DESCRIPTION
      Deletes the specified exercise.

    PARAMENTERS
      id:   (required) exercise id
  */
  deleteExercise: function (req, res) {
    var exerciseId = req.param('id');
    Exercise.destroy({id:exerciseId}).exec(function (err, deleted) {
      if (err) {
        return res.serverError(JSON.stringify(err));

      } else if (deleted.length) {
        FlashService.success(req, 'Successfully deleted exercise!');
        return res.redirect('/admin');

      } else {
        return res.view('404');
      }
    });
  }
}