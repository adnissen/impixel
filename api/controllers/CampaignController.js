/**
 * CampaignController
 *
 * @description :: Server-side logic for managing campaigns
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  track: function(req, res){
    var campaignId = req.param('campaign');
    var campaign = Campaign.findOne(campaignId).exec(function findOneCB(err, data){
      if (err || data == ''){
        return res.json({
          error: 'no campaign found'
        });
      }
      else{
        if (req.param('uid') == '') console.log('WARNING: no userId passed for campaign ' + campaignId + '!');
        if (req.param('r') == '') console.log('WARNING: no random passed for campaign ' + campaignId + '!');

        Impression.create({
          campaign: campaignId,
          userId: req.param('uid'),
          random: req.param('r')
        }).exec(function createCB(data, created){
          Campaign.findOne(campaignId, function findOneCB(e, campaign){
            if (campaign.impressions)
              campaign.impressions = campaign.impressions + 1;
            else
              campaign.impressions = 1;
            campaign.save();
          });
          return res.ok();
        });
      }
    });
  },
  show: function(req, res){
    var campaignId = req.param('campaign');
    Campaign.findOne(campaignId).exec(function findOneCB(err, data){
      if (err || data == ''){
        return res.json({
          error: 'no campaign found'
        });
      }
      else{
        Campaign.calculateImpressions(campaignId, function(e, data){
          return res.json(data);
        });
      }
    });
  }
};

