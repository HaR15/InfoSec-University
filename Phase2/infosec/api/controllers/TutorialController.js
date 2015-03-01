/**
 * TutorialController
 *
 * @description :: Server-side logic for managing tutorials
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
    byCategory: function(req, res) {
        var categoryId = req.param('id');
        Tutorial.find({categoryId : categoryId}).exec(function(err, tutorials) {
            if (!err) {
                Category.find({id: categoryId}).exec(function(err, category) {
                    if(!err) {
                        return res.view('tutorial/tutorialsList', {
                            tutorials: tutorials,
                            category: category[0]
                        });
                    }
                });
            }
        });
    },


    byId: function(req, res) {
        var tutorialId = req.param('id');
        Tutorial.find({id : tutorialId}).exec(function(err, tutorials) {
            if (!err) {
                return res.view('tutorial/tutorial', { tutorial: tutorials[0] });
            }
        });
    }

}
