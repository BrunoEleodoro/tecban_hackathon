var express = require('express');
var router = express.Router();
var connect = require('../db/connection').connect_db;
const queries = require('../utils/queries');
const token = require('../utils/token');
const { protectedRoute, basicAuthRoute } = require('../middlewares/auth');

/* GET houses listing. */
router.get('/', protectedRoute, async function (req, res, next) {
  var db = await connect();
  queries.setDatabase(db);
  var result = await queries.read({}, {}, {}, 'houses')
  res.json({
    status: 200,
    houses: result
  })
});

router.post('/', basicAuthRoute, async (req, res, next) => {
  let imgs = req.body.imgs
  let title = req.body.title
  let description = req.body.description
  let rent_price = req.body.rent_price
  let condominium = req.body.condominium
  let iptu = req.body.iptu
  let fire_insurance = req.body.fire_insurance
  let total = req.body.total
  if (title && imgs && description && rent_price && condominium && iptu && fire_insurance && total) {
    var db = await connect();
    queries.setDatabase(db);

    var result = await queries.create({
      title: title,
      description: description,
      imgs: imgs,
      rent_price: rent_price,
      condominium: condominium,
      iptu: iptu,
      fire_insurance: fire_insurance,
      total: total,
    }, 'Houses', 'houses')

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
  var result = await queries.read({}, {}, {}, 'houses')
  res.json({
    status: 200,
    houses: result
  })
});

router.get('/house/:id', async (req, res) => {
  if (id) {
    var db = await connect();
    queries.setDatabase(db);
    var result = await queries.read({_id: req.params.id}, {}, {}, 'houses')
    res.json({
      status: 200,
      house: result
    })
  } else {
    res.json({
      status: 201,
      message: 'missing parameters'
    })
  }
})


module.exports = router;
