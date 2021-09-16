const express = require("express");
const {
  getArticleAll,
  getArticleDetail,
  addArticle,
  updateArticle,
  deleteArticle,
  updateStatus,
} = require("../../services/Article");
const { handleSend } = require("../../utils/resultMessage");
const router = express.Router();

// 获取所有文章
// 模糊查询
/**
 * 1.文章标题
 * 2.文章作者
 * 3.文章标签
 * 4.审核结果
 */
router.get("/", async (req, res) => {
  let {
    page = 1,
    size = 10,
    title = "",
    review = "0",
    LabelId = "-1",
    AdminId = "",
  } = req.query;

  const result = await getArticleAll(
    page,
    size,
    title,
    review,
    LabelId,
    AdminId
  )
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

// 获取文章详情
router.get("/:id", async (req, res) => {
  // console.log(req.params.id);
  const result = await getArticleDetail(req.params.id)
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

// 添加文章
router.post("/", async (req, res) => {
  const result = await addArticle(req.body)
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

// 修改文章发布状态
router.put("/status", async (req, res) => {
  const resultPro = await updateStatus(req.body)
    .then((data) => {
      if (data == "修改成功") {
        return {
          code: 200,
          msg: "success",
          result: data,
        };
      } else {
        return {
          code: 400,
          msg: "fail,可能没有改动",
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
  handleSend(resultPro, res);
});

// 文章修改内容……
router.put("/:id", async (req, res) => {
  const resultPro = await updateArticle(req.params.id, req.body)
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
  handleSend(resultPro, res);
});



// 删除文章
router.delete("/:id", async (req, res) => {
  const resultPro = await deleteArticle(req.params.id)
    .then((data) => {
      if (data == "删除成功") {
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
        msg: "server fail",
        result: err,
      };
    });
  handleSend(resultPro, res);
});

module.exports = router;
