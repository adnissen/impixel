/**
* Advertiser.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      minLength: 6,
      required: true
    },
    campaigns:{
      type: 'array'
    },
    beforeCreate: function(values, next){
      bcrypt.hash(values.password, 10, function(err, hash){
        if (err) return next(err);
        values.password = hash;
        next();
      });
    }
  },

  getActiveCampaigns: function(advertiserId, cb){
    Campaign.find({advertiser: advertiserId}).exec(function findCB(e, found){
      var campaigns = [];
      while (found.length){
        campaigns.push(found.pop());
      }
      cb(null, campaigns);
    });
  }
};

