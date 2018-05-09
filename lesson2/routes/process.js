var express = require("express");
var router = express.Router();
var path = require("path");
var fs = require("fs");
var child_process = require('child_process');
var util = require('util');
router.get("/process_copy", (req, res, next) => {
    child_process.exec()
    res.send("node控制自身进程运行环境，并创建子进程");
})