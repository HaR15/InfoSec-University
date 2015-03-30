/**
* Exercise.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {


  	title: {
  		type: 'string'
  	},

  	instructions: {
  		type: 'string'
  	},

    validationType: {
      type: 'string'
    },

  	expected: {
  		type: 'array'
  	},

  	additionalCode: {
  		type: 'string'
  	},

  	level: {
  		type: 'string'
  	},

  	tutorialId: {
  		type: 'string'
  	}
  }
};
