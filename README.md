# Node.js 学习笔记
### nodejs 环境搭建
    - nodejs 安装，傻瓜式安装 一路next完成 (https://nodejs.org/en/)
    - 环境变量配置在Path中添加nodejs的安装目录
    - 验证安装是否完成 命令行中执行 node --version，若显示版本号则说明安装成功
###  Hello World
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

### 路由 
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
### 中间件
中间件（Middleware） 是一个函数，它可以访问请求对象（request object (req)）, 响应对象（response object (res)）, 和 web 应用中处于请求-响应循环流程中的中间件，一般被命名为 next 的变量，其作用是可以执行任意代码、处理请求和响应对象、终结请求-响应循环、调用堆栈中的下一个中间件。
- 应用级中间件
- 路由级中间件
- 错误处理中间件
- 内置中间件
- 第三方中间件
### 模版引擎

### 错误处理

### 调试

### 为Express设置代理

### 数据库集成