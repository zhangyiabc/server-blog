const express = require("express");
const router = express.Router();
const { updateUserInfo } = require("../../services/UserInfo");
const { getUserInfoAll, getUserInfoDetail } = require("../../services/Admin");
const { handleSend } = require("../../utils/resultMessage");

// 查看个人用户信息

router.get("/:id", async (req, res, next) => {
  const resultPro = await getUserInfoDetail(req.params.id)
    .then((data) => {
      return {
        code: 200,
        msg: "success",
        result: data,
      };
    })
    .catch((err) => {
      return {
        code: 501,
        msg: "获取失败",
        result: err,
      };
    });
  handleSend(resultPro, res);
});

// 查看所有用户信息
router.get("/", async (req, res) => {
  const page = req.query.page || 1;
  const size = req.query.size || 10;
  const author = req.query.author || "";
  const resultPro = await getUserInfoAll(page, size, author)
    .then((data) => {
      return {
        code: 200,
        msg: "success",
        result: data,
      };
    })
    .catch((err) => {
      return {
        code: 500,
        msg: "获取失败",
        result: err,
      };
    });
  handleSend(resultPro, res);
});

// 修改用户信息
router.put("/:id", async (req, res) => {
  let len = Object.keys(req.body).length;
  if (len == 0) {
    return;
  }
  const resultPro = await updateUserInfo(req.params.id, req.body)
    .then((data) => {
      if(data == "更新成功"){
        return {
          code: 200,
          msg: "更新成功",
        };
      }else{
        return {
          code: 400,
          msg: "更新失败",
        };
      }
    })
    .catch((err) => {

      return {
        code: 500,
        msg: "fail",
        result: err,
      };
    });
  handleSend(resultPro, res)
});
// 删除用户信息(暂时不做)

module.exports = router;
