/**
 * NewsController
 *
 * @description :: Server-side logic for managing news
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	// store a news article and redirect to the created view
	create: function (req, res, next) {
		News.create(req.params.all(), function newsCreate(err,news) {
			if (!err) {
        		return res.view('news/show', { category: categories[0] });
		      } else {
		        return res.view('500');
		      }
		});
	},

	// render the news article view
	show: function (req, res, next) {
		News.findOne(req.param('id'), function foundNews (err, news) {
			if (err) return next(err);
			if (!news) return next();
			res.view({
				news: news
			});
		});
	},

	index: function(req, res, next) {
		News.find(function foundNews (err, news) {
			if (err) return next(err);
			res.view({
				news: news
			});
		});
	}
};

