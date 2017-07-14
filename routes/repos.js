const express = require('express');
const path = require('path');
const GitHub = require('github-api');
const debug = require('debug')(`repostars:${path.basename(__filename).split('.')[0]}`);
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  debug(req.user);
  const gh = new GitHub({
    username: req.user.username,
    token: req.user.token
  });

  const me = gh.getUser();

  // NOTE: Get the repos as a promise
  const getRepos = me => new Promise((res,rej) => {
    me.listRepos((e, repos) => e ? rej(e): res(repos));
  });

  getRepos(me).then( repos => {
    console.log(repos);
    res.render('repos',{
      title: 'Express',
      user: req.user,
      repos:repos
    });
  })
  .catch(e => next(e));
});

module.exports = router;
