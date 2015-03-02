/**
 * ExerciseController
 *
 * @description :: Server-side logic for managing exercises
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	index: function(req, res){
		Exercise.find()
			.exec(function(err, exercises){
				if(!err){
					return res.view('exercise/list', { exercises: exercises });
				}else{
					return res.view('exercise/list', { exercises: [] });
				}
			});
	},

	bytutorial: function(req, res){
		var tutorialId = req.param('id');
		Exercise.find({ tutorial: tutorialId })
			.exec(function(err, exercises){
				if(!err){
					return res.view('exercise/list', { exercises: exercises });
				}else{
					return res.view('exercise/list', { exercises: [] });
				}
			});
	},

	validate: function(req, res){
		var exercideId = req.param('id');
		var received = req.param('code');
		Exercise.find({ id: exercideId})
			.exec(function(err, exercise){
				if(!err){
					if(exercise.expected.replace(/ /g,'')===received.replace(/ /g,'')){
						return res.json({ validation: 'true' });
					}else{
						return res.json({ validation: 'false' });						
					}
				}
			});
	}
	
};

