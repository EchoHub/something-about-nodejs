var express = require("express");
var router = express.Router();
var path = require("path");
var fs = require("fs");
router.get("/callback", function (req, res, next) {
    const src = "/Users/xuyang/x-echo/something-about-nodejs/lesson2/mock/data1.json";
    const content = fs.readFileSync(src).toString();
    copyWriteContent(content, 10, result => {
        res.send(result);
        setTimeout(() => {
            console.log("进程中断");
        }, 2000);
        console.log("2S后进程中断");
    })
})

function copyWriteContent(content, n, callback) {
    let count = 0, i, j, result = "";
    for (i = n; i > 0; --i) {
        for (j = n; j > 0; --j) {
            count += 1;
            result += `<p>JSON返回数据：${count}) ${content} </p>`;
        }
    }
    result = `<h2>共输出数据 ${count} 条</h2>${result}`
    callback(result);
}
module.exports = router;