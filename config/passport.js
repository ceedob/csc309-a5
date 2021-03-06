var passport = require('passport'),
	User = require('mongoose').model('Users')

//USER schema is NOT how I envisioned this
var passport = require('passport')
require('./social.js')()
require('./local.js')()

module.exports = function() {
	// handle user serialization here...
	passport.serializeUser(function(user, done) {
	  done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
	  User.findById(id, function(err, user) {
        done(err, user);
      });
	});
}
