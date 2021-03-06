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
- File System 文件系统 http://nodejs.org/api/fs.html
    - 通过fa模块进行文件操作，其操作类型主要有三类：
        - 文件属性读写 fs.stat、fs.chmod、fs.chown等
        - 文件内容读写 fs.readFile、fs.readdir、fs.writeFile、fs.mkdir等
        - 底层文件读写 fs.open、fs.read、fs.write、fs.close等
- Path 路径 文件路径  http://nodejs.org/api/path.html
    - path.normalize 将传入的路径转化为标准路径，可解析路径中的.和..,也可去掉多余的斜杠 ps:标准化之后的路径里的斜杠在Windows系统下是\，而在Linux系统下是/。如果想保证任何系统下都使用/作为路径分隔符的话，需要用.replace(/\\/g, '/')再替换一下标准路径。
    - path.join 把传入的多个路径拼接成标准路径
    - path.extname 获取文件的扩展名称
- 遍历目录 
    - 常见的遍历算法：递归算法、深度优先+先序遍历算法
    - 同步遍历  
    function travel(dir, callback) {  
        fs.readdirSync(dir).forEach(function(file) {  
            var pathname = path.join(dir, file);  
            if(fs.statSync(pathname).isDirectory()) {  
                travel(pathname, callback)
            }else {  
                callback(pathname)
            }
        })
    }
    - 异步遍历  
    function travel(dir, callback, finish) {  
        fs.readdir(dir, function(err, files) {  
            (function next(i) {  
                if (i < files.length) {  
                    var pathname = path.join(dir, files[i]);
                    fs.stat(pathname, function(err, stats) {  
                        if(stas.isDirectory()) {  
                            travel(pathname, callback, function () {  
                                next(i + 1)
                            })  
                        } else {   
                            callback(pathname, function() {  
                                next(i + 1)
                            })
                        }
                    })
                } else {  
                    finish && finish();
                }
            })(0)
        })
    }
### 文本编码
- GBK转UTF8  
NodeJS支持在读取文本文件时，或者在Buffer转换为字符串时指定文本编码，但遗憾的是，GBK编码不在NodeJS自身支持范围内。因此，一般我们借助iconv-lite这个三方包来转换编码。使用NPM下载该包后，我们可以按下边方式编写一个读取GBK文本文件的函数。
### 网络操作
- http  http://nodejs.org/api/http.html 
    - http的常用方式有两种：
        - 作为服务端使用时，创建一个http服务器，监听http客户端的请求并作出响应
        - 作为客户端使用时，创建一个http客户端请求，获取服务端响应
- https  http://nodejs.org/api/https.html
    - https与http类似，区别在于https需要额外处理SSL证书
- URL http://nodejs.org/api/url.html
    - .parse 将一个URL字符串转为URL对象
    - .format 将URL对象转为URL字符串
    - .resolve 用于拼接URL
    - ...
- Query String 模块用于实现URL参数字符串与参数对象的互相转换  http://nodejs.org/api/querystring.html
    - querystring.parse 字符串转对象
    例如： querystring.parse('foo=bar&baz=qux&baz=quux&corge') --> { foo: 'bar', baz: ['qux', 'quux'], corge: '' }
    - querystring.stringify 对象转字符串  
    例如： querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' }) --> 'foo=bar&baz=qux&baz=quux&corge='
- Zlib zlib模块提供了数据压缩和解压的功能  http://nodejs.org/api/zlib.html
- Net net模块可用于创建Socket服务器或Socket客户端  http://nodejs.org/api/net.html
### 进程管理
NodeJS可以控制自身进程运行环境和状态，从而可以实现多个程序协调工作完成特定工作
- Process http://nodejs.org/api/process.html  
任何一个进程都有启动进程时使用的命令行参数，有标准输入标准输出，有运行权限，有运行环境和运行状态。在NodeJS中，可以通过process对象感知和控制NodeJS自身进程的方方面面。另外需要注意的是，process不是内置模块，而是一个全局对象，因此在任何地方都可以直接使用。
- Child Process http://nodejs.org/api/child_process.html  
使用child_process模块可以创建和控制子进程。该模块提供的API中最核心的是.spawn，其余API都是针对特定使用场景对它的进一步封装，算是一种语法糖。
- Cluster http://nodejs.org/api/cluster.html  
cluster模块是对child_process模块的进一步封装，专用于解决单进程NodeJS Web服务器无法充分利用多核CPU的问题。使用该模块可以简化多进程服务器程序的开发，让每个核上运行一个工作进程，并统一通过主进程监听端口和分发请求。
- 常用场景
    - 获取命令行参数 process.argv 且前两个固定是 执行程序路径 和 主模块文件路径，传入参数实际从第三个开始,可以通过process.argv.slice(2)来进行截取
    - 退出程序  通常一个程序做完所有事情后就正常退出了，这时程序的退出状态码为0。或者一个程序运行时发生了异常后就挂了，这时程序的退出状态码不等于0。如果我们在代码中捕获了某个异常，但是觉得程序不应该继续运行下去，需要立即退出，并且需要把退出状态码设置为指定数字，比如1 --> process.exit(1)
    - 输入输出 NodeJS程序的标准输入流（stdin）、一个标准输出流（stdout）、一个标准错误流（stderr）分别对应process.stdin、process.stdout和process.stderr，第一个是只读数据流，后边两个是只写数据流，对它们的操作按照对数据流的操作方式即可。
    - 降权
    - 创建子进程 child_process.spawn(exec, args, options)
    - 进程通信
    - 进程守护 用于监听进程的运行状态 当工作进程在不正常退出时进行工作进程重启，保证工作进程不间断运行  
    /* daemon.js */
    function spawn(mainModule) {  
        var worker = child_process.spawn('node', [ mainModule ]);  
        worker.on('exit', function (code) {  
            if (code !== 0) {  
                spawn(mainModule);  
            }  
        });  
    }  
    spawn('worker.js');  
    - ps: 1） 通过process对象进行自身管理； 2）通过child_process创建和管理子进程
### 异步编程
- 回调 异步编程依托回调来实现，在js正常执行过程中并不存在异步的情况，只有在执行过程中创建了一个新的进程或者子进程，并且与主进程并行处理一些事务，且子进程在调用完毕后通知主进程，在这种情况下就需要异步回调的方式
- 代码设计模式 同步和异步在代码实现上存在很大不同
- 域  http://nodejs.org/api/domain.html  
一个域就是一个JS运行环境，在一个运行环境中，如果一个异常没有被捕获，将作为一个全局异常被抛出。NodeJS通过process对象提供了捕获全局异常的方法
### 示例
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