//The purpose of this page is to relate to articles in a traditional webpage
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/app', function(req, res, next) {
  res.render('articles/app', {title:'Article Management'});
});

module.exports = router;
