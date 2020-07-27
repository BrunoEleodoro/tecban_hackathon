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
  var cpf = req.body.cpf || "";
  var password = req.body.password || "";

  if (cpf != null && password != null) {
    var db = await connect();
    queries.setDatabase(db);
    var users = await queries.read({ cpf: cpf, password: password }, {}, {}, 'users')
    if (users.length > 0) {
      var jwtToken = await token.generateToken(cpf);
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
  var phoneNumber = req.body.phoneNumber;
  var birthDate = req.body.birthDate;
  var cpf = req.body.cpf;
  var password = req.body.password;
  if (phoneNumber && birthDate && cpf && password) {
    var db = await connect();
    queries.setDatabase(db);
    var result = await queries.create({
      phoneNumber: phoneNumber,
      birthDate: birthDate,
      cpf: cpf,
      password: password
    }, 'Users', 'users')

    console.log('result', result)
    res.json({
      status: 200,
      message: 'success',
      token: await token.generateToken(cpf)
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

  var result = await queries.read({ cpf: req.body.userId }, {}, {}, 'users')

  res.json({
    status: 200,
    token: result[0]
  })

})

module.exports = router;
