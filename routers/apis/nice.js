const express = require("express");
const { giveArticleNice } = require("../../services/Article");
const { giveCommentNice } = require("../../services/Comment");
const { handleSend } = require("../../utils/resultMessage");
const router = express.Router();
// 用于点赞的api

// 评论点赞
router.get("/comment", async (req, res) => {
  // console.log(req.query.id);
  // res.send("评论点赞");
  const resultPro = await giveCommentNice(req.query.id)
    .then((data) => {
      if (data == "点赞成功") {
        return {
          code: 200,
          msg: "success",
          result: data,
        };
      } else {
        return {
          code: 400,
          msg: "fail",
          result: data,
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
  handleSend(resultPro, res);
});

// 文章点赞
router.get("/article", async (req, res) => {
  const resultPro = await giveArticleNice(req.query.id)
    .then((data) => {
      if (data == "点赞成功") {
        return {
          code: 200,
          msg: "success",
          result: data,
        };
      } else {
        return {
          code: 400,
          msg: "fail",
          result: data,
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
  handleSend(resultPro, res);
});

module.exports = router;
