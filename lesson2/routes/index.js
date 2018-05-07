var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  next()
}, function(req, res, next) {
  console.log("/////////////////////")
});
router.get("/getInfo/:id", function(req, res, next) {
  console.log("ID:", req.params.id);
  if(+req.params.id) next("route")
  else next()
}, function(req, res, next) {
  // 渲染常规页面
  res.send('regular');
})

router.get('/getInfo/:id', function (req, res, next) {
  res.send('special');
});

module.exports = router;
