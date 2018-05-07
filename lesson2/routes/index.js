var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  next()
}, function(req, res, next) {
  console.log("======2=======")
});
router.get("/getInfo/:id", function(req, res, next) {
  console.log("ID:", req.params.id);
  res.send(`Param: ${JSON.stringify(req.params)}`);
})

module.exports = router;
