var express = require('express');
var router = express.Router();

var gcloud = require('google-cloud');
var bigquery = gcloud.bigquery({
  projectId: 'gdgsf-devfest-145201',
  keyFilename: __dirname + '/../keyfile.json'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  var query = req.query.q || 'Express'
  res.render('index', { title: String(query) });
});

/* GET bigquery page. */
router.get('/bigquery', function(req, res, next) {
  var limit = req.query.n || 100
  var query = 'SELECT url FROM [publicdata:samples.github_nested] LIMIT ' + limit + '';
  bigquery.query(query, function(err, rows) {
    if (!err) {
      res.render('bigquery', {count: rows.length, rows: JSON.stringify(rows)})
    } else {
      res.render('error', {error: err})
    }
  });
});

module.exports = router;
