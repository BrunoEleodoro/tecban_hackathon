var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/callback', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  let code = req.query.code;
  res.send("<html><body><script>window.location.href = 'http://ds2anqomea.com.br?';  </script></body></html>");

});

module.exports = router;
