var express = require('express');
var router = express.Router();
var connect = require('../db/connection').connect_db;
const queries = require('../utils/queries');
const token = require('../utils/token');
const { protectedRoute } = require('../middlewares/auth');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/auth', async (req, res, next) => {
  var login = req.body.login || "";
  var password = req.body.password || "";

  if (login != null && password != null) {
    var db = await connect();
    queries.setDatabase(db);
    var users = await queries.read({ login: login, password: password }, {}, {}, 'users')
    if (users.length > 0) {
      var jwtToken = await token.generateToken(login);
      res.json({
        status: 200,
        token: jwtToken
      })
    } else {
      res.json({
        status: 201,
        message: 'not found'
      })
    }

  } else {
    res.json({
      status: 201,
      message: 'login and password must be provided'
    })
  }
})



router.post('/signup', async (req, res, next) => {
  var login = req.body.login;
  var password = req.body.password;
  var points = req.body.points;
  var name = req.body.name;
  var img = req.body.img;
  var badge = req.body.badge;
  if (login && password && points && name && img && badge) {
    var db = await connect();
    queries.setDatabase(db);
    var result = await queries.create({
      login: login,
      password: password,
      points: points,
      name: name,
      img: img,
      badge: badge
    }, 'Users', 'users')

    console.log('result', result)
    res.json({
      status: 200,
      message: 'success'
    })
  } else {
    res.json({
      status: 201,
      message: 'missing parameters'
    })
  }


})

router.get('/profile', protectedRoute, async (req, res, next) => {

  var db = await connect();
  queries.setDatabase(db);

  var result = await queries.read({ login: req.body.userId }, {}, {}, 'users')

  res.json({
    status: 200,
    token: result[0]
  })

})

module.exports = router;
