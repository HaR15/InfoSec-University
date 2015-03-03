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
            console.log(tutorials);
            if (!err && tutorials.length > 0) {
                Category.find({id: categoryId}).exec(function(err, categories) {
                    console.log(categories);
                    if(!err && categories.length > 0) {
                        return res.view('tutorial/tutorialsList', {
                            tutorials: tutorials,
                            category: categories[0]
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
    }

}
