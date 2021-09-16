/*
 * @Description: 功能描述
 * 1. 文件上传到服务器先保存在服务器
 * 2. 保存成功后上传到阿里云oss
 * 3. 阿里云oss上传成功后返回的信息发送给客户端
 * 4. 删除服务器本地文件
 * @FilePath: \3.nodejs-mysql-test\routes\apis\upload.js
 */

/* 处理文件上传的中间件 */
const fs = require('fs')
const express = require("express");
const router = express.Router();
const path = require('path')
const multer = require('multer')
const { ossPutFunc } = require('../../utils/ossUpload')

const storage = multer.diskStorage({
  // 以下两个方法是修改req.file中的destination和filename这两个信息
  // 文件的磁盘存储位置
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../../public/upload'))
  },
  // 文件的名字
  filename: function (req, file, cb) {
    // console.log(file)
    const timeStamp = ('' + Date.now()).substr(6)
    const randomStr = Math.random().toString(36).slice(-6);
    const exitName = path.extname(file.originalname)
    cb(null, `${timeStamp}-${randomStr}${exitName}`)

  }
})

const upload = multer({
  // dest: path.resolve(__dirname, '../../public/upload'),
  storage,
  limits: {
    fileSize: 1500 * 1024,
  },
  fileFilter(req, file, cb) {
    // 根据cb函数的参数来进行文件的过滤
    const whitelist = ['.png', '.jpg', '.jpeg', '.gif']
    const extname = path.extname(file.originalname)
    if (whitelist.includes(extname)) {
      cb(null, true);
    } else {
      cb(new Error(`your ext name of ${extname} is not support`));
    }
  }
})

// single(参数) 中的参数是请求的字段名称，必须正确填写

router.post("/", upload.single('file'), async (req, res) => {
  // 此时已经对文件的格式、大小、上传位置做出了限制
  // const url = `/upload/${req.file.filename}`
  // 接下来进行oss的上传
  console.log("开始上传了")
  const result = await ossPutFunc(`${req.body.name}/${req.file.filename}`, req.file.path)
  // console.log(result)
  if (result.res.status === 200) {
    // 此时上传成功
    // 1.删除本地文件
    // 2.发送响应

    fs.unlink(req.file.path, () => {
      console.log("删除成功")
    })

    res.send({
      code: 200,
      msg: "上传完成",
      data: result.url,
    })
  } else {
    res.send({
      code: result.res.status,
      msg: "上传失败",
      data: '',
    })
  }

})

module.exports = router