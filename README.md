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