var express = require('express');
var router = express.Router();
var connect = require('../db/connection').connect_db;
const queries = require('../utils/queries');
const token = require('../utils/token');
const { protectedRoute, basicAuthRoute } = require('../middlewares/auth');

/* GET books listing. */
router.get('/', protectedRoute, async function (req, res, next) {
  var db = await connect();
  queries.setDatabase(db);
  var result = await queries.read({}, {}, {}, 'books')
  res.json({
    status: 200,
    books: result
  })
});

router.post('/', basicAuthRoute, async (req, res, next) => {
  let title = req.body.title
  let description = req.body.description
  let rating_star = req.body.rating_star
  let rating_content = req.body.rating_content
  let thumbnail = req.body.thumbnail
  let pages = req.body.pages
  let themes = req.body.themes
  if (title && description && rating_star && rating_content && thumbnail && pages && themes) {
    var db = await connect();
    queries.setDatabase(db);

    var result = await queries.create({
      title: title,
      description: description,
      rating_star: rating_star,
      rating_content: rating_content,
      thumbnail: thumbnail,
      pages: pages,
      themes: themes,
    }, 'Books', 'books')

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

router.delete('/', protectedRoute, async function (req, res, next) {
  var db = await connect();
  queries.setDatabase(db);
  var result = await queries.read({}, {}, {}, 'books')
  res.json({
    status: 200,
    books: result
  })
});


module.exports = router;
