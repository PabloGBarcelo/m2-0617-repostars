const path = require('path');
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const debug = require('debug')(`repostars:${path.basename(__filename).split('.')[0]}`);

passport.serializeUser(function(user, cb) { cb(null, user); });
passport.deserializeUser(function(obj, cb) { cb(null, obj);  });

passport.use(new GitHubStrategy({
    clientID:     process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: "http://localhost:3000/auth/github"
  },
  (accessToken, refreshToken, profile, done) => {
    // save the user if it doesn't exist
    debug("We have the profile");
    console.log(profile);
  }
));
