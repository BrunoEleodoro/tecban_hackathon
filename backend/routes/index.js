var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  let code = req.query.code;
  res.redirect(req.get('referer'));

});

module.exports = router;
