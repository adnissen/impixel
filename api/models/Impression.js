/**
* Impression.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    campaign: {
      type: 'string',
      required: true
    },
    userId: {
      type: 'string',
      required: true
    },
    random: {
      type: 'string',
      required: true
    }
  }
};

