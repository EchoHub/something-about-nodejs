# Node.js 学习笔记
### nodejs 环境搭建
    - nodejs 安装，傻瓜式安装 一路next完成 (https://nodejs.org/en/)
    - 环境变量配置在Path中添加nodejs的安装目录
    - 验证安装是否完成 命令行中执行 node --version，若显示版本号则说明安装成功
### npm 使用
- npm adduser 使用npm发布前进行账户注册
- npm publish 发布
    - 版本规则 X.Y.Z，bug修复进行Z修改，新功能添加且向下兼容，进行Y修改，大版本修改且不向下兼容，进行X修改
- npm update <package> 更新某个包至最新版本
- npm cache clear可以清空NPM本地缓存，用于对付使用相同版本号发布新版本代码的人
- npm unpublish <package>@<version>撤销发布过的某个版本
### 文件操作 fs模块使用
- 小文件拷贝
    - fs.readFileSync 从源文件中读取
    - fs.writeFileSync 向源文件中写入
    - 这种方式是将先讲文件读取到内容，再进行磁盘修改，不适合大文件拷贝
- 大文件拷贝 
    - createReadStream/createWriteStream 通过createReadStream创建一个源文件读取流，再通过createWriteStream创建一个目标文件的只写数据流
- Buffer 数据块，二进制数据操作  http://nodejs.org/api/buffer.html
    - 二进制转字符串 bin.toString("utf-8")
    - 字符串转二进制 new Buffer("hello", "utf-8")
- Stream 数据流 http://nodejs.org/api/stream.html
    - createReadStream  
    var rs = fs.createReadStream(src);  
    rs.on('data', function (chunk) {  
        rs.pause();  
        doSomething(chunk, function () {  
            rs.resume();  
        });  
    });  
    rs.on('end', function () {  
        cleanUp();  
    });
    - createWriteStream  
    var rs = fs.createReadStream(src);  
    var ws = fs.createWriteStream(dst);  
    rs.on('data', function (chunk) {  
        if (ws.write(chunk) === false) {  
            rs.pause();  
        }  
    });  
    rs.on('end', function () {  
        ws.end();  
    });  
    ws.on('drain', function () {  
        rs.resume();  
    });  
- File System 文件系统
### Express使用
####  Hello World
- express 安装 npm i express -g  
  cnpm 淘宝代理设置 npm install -g cnpm --registry=https://registry.npm.taobao.org
- hello world， 详情请看lesson1 进入lesson1 执行node app.js 服务器就跑起来了
- express-generator 生成器 
    - cnpm i express-generator -g 
    - express hello 创建属于你的第一个express应用
- 利用ejs使用html模版替换默认的jade模版 
    - 安装ejs引擎 cnpm i ejs --save
    - app.js 中引入 ejs = require("ejs")
    - 创建引擎 app.engine("html", ejs.__express)
    - 设置视图路径 app.set('view engine', 'html');
    - 创建属于你的html模版
- 执行 npm run start，访问http://localhost:3000/

#### 路由 
- 路由组成  
app.METHOD(path, [callback...], callback)，其中 METHOD 是一个 HTTP 请求方法， path 是服务器上的路径， callback 是当路由匹配时要执行的函数。  
Express 定义了如下和 HTTP 请求对应的路由方法： get, post, put, head, delete, options, trace, copy, lock, mkcol, move, purge, propfind, proppatch, unlock, report, mkactivity, checkout, merge, m-search, notify, subscribe, unsubscribe, patch, search, 和 connect。  
app.all() 是一个特殊的路由方法，没有任何 HTTP 方法与其对应，它的作用是对于一个路径上的所有请求加载中间件，不管使用 GET、POST、PUT、DELETE 或其他任何 http 模块支持的 HTTP 请求，句柄都会得到执行
- 路由路径  
路径可以由字符串、字符串模式、正则表达式构成，例如：
   - 字符串  
    - app.get("/getInfo", (req, res) => {})
   - 字符串模式  
    - ?:app.get("/ab?cd", (req, res) => {}) 匹配/abc || /abcd
    - +:app.get("/ab+cd", (req, res) => {}) 匹配/ab(0~n个b)cd
    - *:app.get("/ab*cd", (req, res) => {}) 匹配/ab任意字符cd
    - ()?:app.get("/ab(cd)?e", (req, res) => {}) 匹配/abe || /abcde
   - 正则表达式  
    - /a/ 匹配所有包含a的路径
    - ...
- 路由句柄
为请求提供多个回调函数，路由句柄可以为一个函数、一个函数组、或者两者结合。  
  - 一个函数  
    app.get("/test", function(req, res, next) {})
  - 一个函数组  
    app.get("/test", [func1, func2, func3])  
  - 两者结合  
    app.get("/test", [func1, func2], function(req, res, next) {})
- app.route/express.Router 创建链式句柄
  - 创建router: express().route / express.Router()
#### 中间件
中间件（Middleware） 是一个函数，它可以访问请求对象（request object (req)）, 响应对象（response object (res)）, 和 web 应用中处于请求-响应循环流程中的中间件，一般被命名为 next 的变量，其作用是可以执行任意代码、处理请求和响应对象、终结请求-响应循环、调用堆栈中的下一个中间件。
- 应用级中间件：对应app（express的实例对象）可以绑定的app对象上使用app.user或者app.METHOD跳转不同的http请求
- 路由级中间件：对应（express.Router的实例对象）可以对一个路径配置多个不同的路由   
    例如： app.get("/getInfo/:id", function(req, res, next) {   
        const id = req.params.id;   
        if(id) next("detail")   
        else next()
    })
- 错误处理中间件：function(err, req, res, next) 拥有四个参数
- 内置中间件：https://github.com/senchalabs/connect#middleware
- 第三方中间件：第三方包扩展express功能
#### 模版引擎
设置对应的渲染模版文件：
- views 放模版的文件目录，app.set("views", "./views");
- view engine 模版引擎，app.set("view engine", "jade") jade模版/ejs模版／html模版
#### 错误处理 
- http://www.expressjs.com.cn/guide/error-handling.html
#### 调试
Express 内部使用 debug 模块记录路由匹配、使用到的中间件、应用模式以及请求-响应循环。   
- 启动debug模式：DEBUG=express:* node index.js
- DEBUG=express: ( * - 所有， router - 路由，application - 应用)
- https://github.com/visionmedia/debug
#### 为Express设置代理
- http://www.expressjs.com.cn/guide/behind-proxies.html
#### 数据库集成
- http://www.expressjs.com.cn/guide/database-integration.html