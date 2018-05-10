var express = require("express");
var router = express.Router();
var path = require("path");
var fs = require("fs");
var process = require("process");
var child_process = require('child_process');
var util = require('util');
router.get("/process_copy", (req, res, next) => {
    const source = "/Users/xuyang/x-echo/something-about-nodejs/lesson2/mock";
    const target = "/Users/xuyang/x-echo/something-about-nodejs/lesson2/mock2";
    copy(source, target, function(err) {
    });
    res.send("node控制自身进程运行环境，并创建子进程，子进程为异步");
})

router.get("/process_getArgv", (req, res, next) => {
    res.send(process.argv)
})

function copy(source, target, callback) {
    child_process.exec(
        util.format('cp -r %s/* %s', source, target), callback
    )
}

module.exports = router;