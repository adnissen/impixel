/**
 * AdvertiserController
 *
 * @description :: Server-side logic for managing advertisers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  login: function(req, res){
    Advertiser.findOne(req.param('advertiser')).exec(function findOneCB(e, advertiser){
      if (req.param('password') == advertiser.password){
        req.session.advertiserToken = req.param('password');
        req.session.advertiserId = req.param('advertiser');
        return res.redirect('/advertiser/' + req.param('advertiser') + '/dashboard');
      }
      else{
        return res.view('advertiser/login', {
          advertiserId: req.param('advertiser')
        });
      }
    });
  },
  showCampaign: function(req, res){
    var advertiserId = req.param('advertiser');
    var campaignId = req.param('campaign');
    Campaign.belongsToAdvertiser(campaignId, advertiserId, function(e, response){
      if (response == false){
        return res.json({
          error: 'access denied'
        });
      }
      Campaign.findOne(campaignId).exec(function findOneCB(err, campaign){
        Campaign.calculateImpressions(campaignId, function(e, data){
          return res.view('advertiser/campaign', {
            id: campaign.id,
            name: campaign.name,
            impressions: data.impressions,
            uniqueCountRandom: data.uniqueCountRandom,
            uniqueCountUid: data.uniqueCountUid
          });
        });
      });
    });
  },
  show: function(req, res){
    var advertiserId = req.param('advertiser');
    Advertiser.getActiveCampaigns(advertiserId, function(e, data){
      return res.view('advertiser/dashboard', {
        campaigns: data
      });
    });
  }
};
