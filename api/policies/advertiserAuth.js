/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

var bcrypt = require('bcrypt');

module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  if (req.session.advertiserToken) {
    Advertiser.findOne(req.param('advertiser')).exec(function findOneCB(e, advertiser){
      bcrypt.compare(req.session.advertiserToken, advertiser.password, function(err, hash){
        if (hash == true)
          return next();
        else{
          // User is not allowed
          // (default res.forbidden() behavior can be overridden in `config/403.js`)
          return res.redirect('/advertiser/' + req.param('advertiser') + '/login');
        }
      });
    });
  }
  else
    return res.redirect('/advertiser/' + req.param('advertiser') + '/login');
};
