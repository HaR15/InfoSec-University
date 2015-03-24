/**
 * ExerciseController
 *
 * @description :: Server-side logic for managing exercises
 * @author 		:: Lucas Lima
 */

module.exports = {


	// ACTION NAME: byId
	// USE: Action returns exercise by a given ID
	// PARAMETERS/INPUTS:
	//		id - ID of Exercise
	byId: function(req, res){

		// Get ID (Tutorial ID) parameter from HTTP Request
		var exerciseId = req.param('id'); 

		// Find exercise by given ID
		Exercise.findOne({ id: exerciseId }) 
			.exec(function(err, exercise){

				// If no error occurred, then return the exercise
				if(!err){ 
					return res.view('exercise/exercise', { exercise: exercise });

				// If error occurred or object not found then respond with 404	
				}else{ 
					console.log(err);
					return res.send(404);
				}
			});
	},
	


	// ACTION NAME: byTutorial
	// USE: Action returns all the exercises which correspond to a given tutorial
	// PARAMETERS/INPUTS:
	//		id - ID of Tutorial
	byTutorial: function(req, res){

		// Get ID (Tutorial ID) parameter from HTTP Request
		var tutorialId = req.param('id'); 

		// Find all exercises in the Exercises Collection by Tutorial id
		Exercise.find({ tutorialId: tutorialId }) 
			.exec(function(err, exercises){

				// If no error occurred, then return all the Exercises
				if(!err){ 
					return res.view('exercise/exercises', { exercises: exercises });

				// If error occurred, then return an empty array	
				}else{ 
					return res.view('exercise/exercises', { exercises: [] });
				}
			});
	},



	// ACTION NAME: validate
	// USE: Action validate exercises codes
	// PARAMETERS/INPUTS:
	//		id - ID of Exercise
	//		code - Code to validate
	validate: function(req, res){

		// Get ID (Exercise ID) parameter from HTTP Request
		var exercideId = req.param('id'); 

		// Get Code parameter from HTTP Request
		var received = String(req.param('code')).replace(/[\n\r\t]/g,'').replace(/ /g,''); 

		// Find the exercise object by the given ID
		Exercise.findOne({ id: exercideId}) 
			.exec(function(err, exercise){


				// If no errors occurred and the exercise is found
				// Send a response 
				if(!err){ 

					// If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
    				// send a simple response letting the user agent know they were logged out
    				// successfully.
				    if (req.wantsJSON) {
				    	var expected = exercise.expected.replace(/[\n\r\t]/g,'').replace(/ /g,'');


				    	// Tests if code received matches the code expected
				    	// by comparing the two string without whitespaces
				    	if(expected===received){

				    		// If code matches, update user's profile with the completed exercise (if logged in)
				    		// and respond with validation=true
				    		if (req.session.username) {
				    			sails.controllers.user.updateExercisesCompleted(req, res, exercise.title);
				    		}
  							return res.ok({ validation: 'true', expected:  expected, received: received});
				    	}else{

				    		// If code doesn't match, responde with validation=false
  							return res.ok({ validation: 'false', expected:  expected, received: received});

				    	}


					}else{
						// Otherwise if this is an HTML-wanting browser, do a redirect. 
						return res.redirect('/exercise/byId?id=' + exercideId); 						
					}

				// If any error occurs or exercise is not found, respond with 404
				}else{
					return res.send(404);
				}

			});
	},


	createExercise: function(req, res){

		Tutorial.find() 
		.exec(function(err, tutorials){

			// If no error occurred, then return all the tutorials
			if(!err){ 
				return res.view('admin/createExercise', { tutorials: tutorials });

			// If error occurred, then return an empty array
			}else{ 
				return res.view('admin/createExercise', { tutorials: [] });
			}
		});

	}

	
};

