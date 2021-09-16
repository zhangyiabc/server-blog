/*
 * @Author: your name
 * @Date: 2021-09-02 21:25:49
 * @LastEditTime: 2021-09-03 09:42:49
 * @LastEditors: Please set LastEditors
 * @Description: 总的配置，服务启动
 * @FilePath: \server\routers\init.js
 */
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const port = 5888;

// 访问静态资源
const staticDir = path.resolve(__dirname, "../public");
app.use(express.static(staticDir));

// 设置跨域处理
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        callback(null, "*");
        return;
      }
      callback(null, origin);
    },
    credentials: true,
  })
);

// 加入cookie-parser 中间件
// 加入之后，会在req对象中注入cookies属性，用于获取所有请求传递过来的cookie
// 加入之后，会在res对象中注入cookie方法，有用于设置cookie
const cookieParser = require("cookie-parser");
app.use(cookieParser());


// 处理token的中间件
app.use(require('./middleware/token'))

// post请求的两种方式进行解析
// 解析 application/x-www-form-urlencoded 格式的请求体
app.use(express.urlencoded({ extended: true }));

// 解析 application/json 格式的请求体
app.use(express.json());

// 处理记录api日志的中间件
app.use(require("./middleware/apiLogger"));

// 处理api
// 处理文章部分的api
app.use("/api/article", require("./apis/Article"));
// 处理用户部分的api
app.use("/api/admin", require("./apis/Admin"));
app.use("/api/admin/user", require("./apis/UserInfo"));
// 处理评论部分的api
app.use("/api/comment", require("./apis/comment"));
// 处理标签部分的api
app.use("/api/label", require("./apis/Label"));
// 处理点赞的api
app.use("/api/nice", require("./apis/nice"));
// 处理文件上传的api
app.use("/api/upload",require("./apis/upload"))

app.listen(port, () => {
  console.log(`正在访问${port}端口`);
});
