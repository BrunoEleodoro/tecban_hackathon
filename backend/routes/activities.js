var express = require('express');
var router = express.Router();
var connect = require('../db/connection').connect_db;
const queries = require('../utils/queries');
const token = require('../utils/token');
const { protectedRoute, basicAuthRoute } = require('../middlewares/auth');

/* GET activities listing. */
router.get('/', protectedRoute, async function (req, res, next) {
  var db = await connect();
  queries.setDatabase(db);
  var result = await queries.read({}, {}, {}, 'activities')
  res.json({
    status: 200,
    books: result
  })
});

router.post('/', basicAuthRoute, async (req, res, next) => {
  var title = req.body.title;
  var questions = req.body.questions;

  if (title && questions) {
    var db = await connect();
    queries.setDatabase(db);
    var result = await queries.create({
      title: title,
      questions: questions
    }, 'Activities', 'activities')

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

module.exports = router;
