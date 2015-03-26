/**
 * MainController
 *
 * @description :: Server-side logic for managing global chat
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	addMessage: function(req, res){
		Chat.create(req.body).exec(function(err, result){
			return res.redirect('/chat/messages');
		});
	},

	fetchMessages: function(req, res){
		Chat.find().sort('createdAt desc').limit(10).exec(function (err, messages) {
			if (err){
				return res.view('chat/globalChat',{
					messages: []
				});
			} 
			else {
				return res.view('chat/globalChat',{
					messages: messages
				});
			}
		});
	}
};
