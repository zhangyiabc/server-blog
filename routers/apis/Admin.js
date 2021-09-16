const express = require("express");
const router = express.Router();
const { addAdmin, login, updateAdmin } = require("../../services/Admin");
const { handleSend } = require("../../utils/resultMessage");
const jwt = require("../jwt/index");
// 登录
router.post("/login", async (req, res) => {
  let len = Object.keys(req.body).length;
  if (len === 0) {
    return null;
  }
  const resultPro = await login(req.body.username, req.body.password)
    .then((data) => {
      if (data) {
        return {
          code: 200,
          msg: "登录成功",
          result: data,
        };
      }
      return {
        code: 400,
        msg: "登录失败",
        result: data,
      };
    })
    .catch((err) => {
      return {
        code: 400,
        msg: "登录失败",
        result: err,
      };
    });
  if (resultPro) {
    let id = resultPro.id;
    // 此时发放jwt
    jwt.publish(res, 3600 * 24 * 1000, { id });
  }

  handleSend(resultPro, res);
});

// 注册用户
router.post("/register", async (req, res) => {
  let len = Object.keys(req.body).length;

  if (len == 0) {
    return;
  }
  const resultPro = await addAdmin(req.body)
    .then((result) => {
      return {
        code: 200,
        msg: "success",
        result: result,
      };
    })
    .catch((err) => {
      return {
        code: 400,
        msg: "密码设置错误",
        result: err,
      };
    });
  handleSend(resultPro, res);
});

// 修改账户信息(用户名，密码)
router.put("/", async (req, res) => {
  let len = Object.keys(req.body).length;

  if (len == 0) {
    return;
  }
  const resultPro = await updateAdmin(req.body)
    .then((data) => {
      console.log(data)
      return {
        code: 200,
        msg: "success",
        result: data,
      };
    }).catch(err => {
      return {
        code: 400,
        msg: "密码设置错误",
        result: err,
      };
    })
    
  handleSend(resultPro, res);
});



module.exports = router;
