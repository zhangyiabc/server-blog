// 处理验证token的中间件
const {
  pathToRegexp
} = require("path-to-regexp");
const {
  handleSend
} = require("../../utils/resultMessage");
const jwt = require("../jwt/index");
// 需要验证token的接口
const needTokenApi = [
  {
    method: "PUT",
    path: "/api/admin"
  },
  {
    method: "GET",
    path: "/api/admin/user/:id"
  },
  {
    method: "PUT",
    path: "/api/admin/user/:id"
  },
  {
    method: "GET",
    path: "/api/article/:id"
  },
  {
    method: "POST",
    path: "/api/article"
  },
  {
    method: "PUT",
    path: "/api/article/:id"
  },
  {
    method: "DELETE",
    path: "/api/article/:id"
  },
  {
    method: "PUT",
    path: "/api/article/status"
  },
  {
    method: "POST",
    path: "/api/label"
  },
  {
    method: "PUT",
    path: "/api/label/:id"
  },
  {
    method: "DELETE",
    path: "/api/label"
  },
  {
    method:"GET",
    path:"/api/comment"
  },
  {
    method:"DELETE",
    path:"/api/comment/:id"
  },
  {
    method:"POST",
    path:"/api/comment"
  },
  {
    method:"POST",
    path:"/api/upload"
  }

];

// 用于解析token
module.exports = (req, res, next) => {
  const neeApis = needTokenApi.filter((api) => {
    const reg = pathToRegexp(api.path);
    return api.method == req.method && reg.test(req.path);
  });
  if (neeApis.length === 0) {
    next();
    return;
  }
  let token = req.cookies.token || "";
  // console.log(token);
  if (!token) {
    token = req.headers.Authorization || "";
  }
  if (!token) {
    // 没有认证
    handlerNoToken(req, res, next);
    return;
  }
  // console.log(token)
  // 验证token
  const result = jwt.verify(req);
  if (result) {
    // 认证通过
    req.userId = result.id;
    next();
  } else {
    handlerNoToken(req, res, next);
  }
};

// 处理验证没有通过的情况
function handlerNoToken(req, res, next) {
  handleSend({
    code: 401,
    msg: "client 获取失败",
    result: "请先进行登录！"
  }, res);
}