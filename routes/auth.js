const express = require('express');
const passport = require('passport');
const router = express.Router();

// Passport Routes Configuration
router.get('/login',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    //res.redirect('/repositories');
    res.redirect('/');
  });

module.exports = router;
