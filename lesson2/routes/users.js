var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("========= users ==========")
  res.send('respond with a resource');
});
router.get('/about', function(req, res, next) {
  console.log("========= users.about ==========")
  res.send('respond with a resource');
});

module.exports = router;
