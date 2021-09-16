const Mock = require('mockjs')
const Article = require('../models/Article')
// 模拟文章表
const res = Mock.mock({
  "data|10":[{
    cover:"http://test-zyd.oss-cn-beijing.aliyuncs.com/zhangyida/0417307-teudpo.jpg",
    title:"@cparagraph(1)",
    content:"@cparagraph(5)",
    "nicecount|5-15":1,
    "viewcount|5-15":1,
    "review|1-3":1,
    message:"@word",
    "AdminId":1,
    "LabelId":function(){
      return '' + Math.floor(Math.random() * (22 - 1) + 1)
    }
  }]
}).data
// console.log(res)
Article.bulkCreate( res ).then(res => {
  console.log("创建成功",res)
}).catch(err => {
  console.log(err)
})