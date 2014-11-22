/**
* Campaign.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    advertiser: {
      type: 'int',
      required: true
    }
  },

  calculateImpressions: function(id, cb){
    var campaignId = id;
    Impression.find({campaign: campaignId}).exec(function findCB(err, found){
      var foundRandom = [];
      var foundUid = [];
      var count = 0;
      var uniqueCountRandom = 0;
      var uniqueCountUid = 0;
      while (found.length){
        count = count + 1;
        var id = found.pop().random;
        if (foundRandom.indexOf(id) == -1){
          foundRandom.push(id);
          uniqueCountRandom = uniqueCountRandom + 1;
        }
        if (foundUid.indexOf(id) == -1){
          foundUid.push(id);
          uniqueCountUid = uniqueCountUid + 1;
        }
      }
      cb(null, {impressions: count, uniqueCountRandom: uniqueCountRandom, uniqueCountUid: uniqueCountUid});
    });
  },
  
  belongsToAdvertiser: function(campaignId, advertiserId, cb){
    var campaignId = campaignId;
    var advertiserId = advertiserId;
    Campaign.findOne(campaignId).exec(function findOneCB(err, campaign){
      Advertiser.findOne(advertiserId).exec(function findOneCB(err, advertiser){
        if (advertiser == undefined || campaign == undefined){
          cb(null, false);
          return;
        }
        if (campaign.advertiser == advertiser.id){
          cb(null, true);
          return;
        }
        else{
          cb(null, false);
          return;
        }
      });
    });
  }
};

