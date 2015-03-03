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

    categories: function(req, res) {
        Category.find().exec(function(err, cats){
            if (!err) {
                return res.view('admin/createTutorial', cats);
            } else {
                return res.view('500');
            }
        });
    }

}
