const express = require("express");
const {
  getAllLabel,
  addLabel,
  updateLabel,
  deleteLabel,
} = require("../../services/Label");
const { handleSend } = require("../../utils/resultMessage");
const router = express.Router();

// 获取所有标签
router.get("/", async (req, res) => {
  const result = await getAllLabel()
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

// 获取标签详情
// router.get("/:id",async (req,res) => {

// })

// 新增标签
router.post("/", async (req, res) => {
  const result = await addLabel(req.body)
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

// 修改标签
router.put("/:id", async (req, res) => {
  const result = await updateLabel(req.params.id, req.body)
    .then((data) => {
      if (data == "更新成功") {
        return {
          code: 200,
          msg: "success",
          result: data,
        };
      } else {
        return {
          code: 400,
          msg: "client fail,请检查是否改动了",
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

// 删除标签
router.delete("/:id", async (req, res) => {
  const result = await deleteLabel(req.params.id)
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
          msg: "client fail,请检查是否删除了一个不存在的标签",
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

module.exports = router;
