const express = require("express");
const { addComm, delComm, getAllComm } = require("../../services/Comment");
const { handleSend } = require("../../utils/resultMessage");
const router = express.Router();

// 增加一条评论
router.post("/", async (req, res) => {
  const result = await addComm(req.body)
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
        msg: "fail",
        result: err,
      };
    });
  handleSend(result, res);
});

// 删除一条评论
router.delete("/:id", async (req, res) => {
  const result = await delComm(
    req.params.id,
    req.body.AdminId,
    req.body.ArticleId
  )
    .then((data) => {
      console.log(data)
      if (data == "删除成功") {
        return {
          code: 200,
          msg: "success",
          result: data,
        };
      } else {
        return {
          code: 400,
          msg: "client fail,请检查是否删除了一个不存在的评论",
          result: data,
        };
      }
    })
    .catch((err) => {
      return {
        code: 500,
        msg: "server fail",
        result: err,
      };
    });
  handleSend(result, res);
});

// 获取文章下所有评论
router.get("/", async (req, res) => {
  const page = req.query.page || 1;
  const size = req.query.size || 10;
  const id = req.query.id || "";

  const result = await getAllComm(page, size, id)
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
        msg: "server fail",
        result: err,
      };
    });
  handleSend(result, res);
});

module.exports = router;
