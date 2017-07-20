const path = require('path');
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const debug = require('debug')(`repostars:${path.basename(__filename).split('.')[0]}`);
const User = require('../models/User');

passport.serializeUser(function(user, cb) {
  cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
  (accessToken, refreshToken, profile, next) => {
    // save the user if it doesn't exist
    debug("We have the profile");
    //console.log(profile);

    let newUser = {
      token: accessToken,
      githubId: profile._json.id || '',
      name: profile._json.name || '',
      username: profile._json.login || '',
      email: profile._json.email || '',
      avatar: profile._json.avatar_url || ''
    };
    console.log(newUser);

    User.findOne({githubId:newUser.githubId}).exec()
    .then(user => {
      if(!user) return new User(newUser).save();
      return User.findByIdAndUpdate(user._id, newUser,{new:true}).exec();
    })
    .then( user => next(null, user))
    .catch(e => next(e));
  }
));
