var express = require('express');
var router = express.Router();
var connect = require('../db/connection').connect_db;
const queries = require('../utils/queries');
const token = require('../utils/token');
const { protectedRoute, basicAuthRoute } = require('../middlewares/auth');
const { getAccessToken, generateConsentId, getConsentURL, functionalToken, getBasicInformation, getBalance } = require('../utils/open_banking');

router.get('/authorize', protectedRoute, async function (req, res, next) {
  var db = await connect();
  queries.setDatabase(db);
  let access_token = await getAccessToken();
  access_token = access_token.access_token;
  let consentId = await generateConsentId(access_token);
  consentId = consentId.Data.ConsentId;
  let consentURL = await getConsentURL(consentId);

  res.json({
    status: 200,
    url: consentURL
  })
});

router.post('/callback', async function (req, res, next) {
  let code = req.body.code;
  let cpf = req.body.cpf;
  if (code && cpf) {
    let token = await functionalToken(code);
    var user = await queries.read({ cpf: cpf }, {}, {}, 'users')
    user = JSON.parse(JSON.stringify(user[0]))
    let oldId = user._id;
    delete user._id;

    let basic_information = await getBasicInformation(token.access_token);
    let balance = await getBalance(token.access_token);

    user.functionalToken = token;
    user.basic_information = basic_information;
    user.balance = balance;

    let result = await queries.update(oldId, user, 'users');

    res.json({
      status: 200,
      result: result
    })
  } else {
    res.json({
      status: 201,
      message: 'Missing parameters'
    })
  }
})



module.exports = router;
