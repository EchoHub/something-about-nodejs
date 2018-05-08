var express = require('express');
var router = express.Router();
var fs = require("fs");
var path = require("path");

/* GET home page. */

const src = "/Users/xuyang/x-echo/something-about-nodejs/lesson2/mock/data1.json";
const dst = "/Users/xuyang/x-echo/something-about-nodejs/lesson2/mock/data2.json";
router.get("copyFile", function (req, res, next) {
  fs.createReadStream(src).pipe(fs.createWriteStream(dst));
})
router.get("/readInfoAsync", function(req, res, next) {
  let content = ""
  fs.readFile(src, (err, data) => {
    if(err) {
      res.send(err)
    }
    content = data.toString("utf-8");
    res.send(`这是异步获取数据：${content}`)
  })
})
router.get("/readInfoSync", function(req, res, next) {
  try {
    const content = fs.readFileSync(src);
    res.send(`这是同步获取数据：${content}`)
  } catch (error) {
    res.send(error);
  }
})
module.exports = router;
