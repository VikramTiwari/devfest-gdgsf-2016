var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var query = req.query.q || 'Express'
  res.render('index', { title: String(query) });
});

module.exports = router;
