// 测试文章的功能
const {
  getArticleAll,
  getArticleDetail,
  deleteArticle,
  addArticle,
  updateArticle,
} = require("../services/Article");
// 查
// getArticleAll(1,10,"如委常代水它共组").then(res => {
//   console.log(res)
// })

// getArticleAll(1,10,"",'2').then(res => {
//   console.log(res)
// })

// getArticleAll(1,10,"",undefined,'1','2').then(res => {
//   console.log(res)
// })

getArticleDetail(105).then(res => {
  console.log(res)
})

// 删除
// deleteArticle(100).then(res => {
//   console.log(res)
// })

// 增加文章
const obj = {
  cover:
    "http://test-zyd.oss-cn-beijing.aliyuncs.com/zhangyida/0417307-teudpo.jpg",
  title: "这是测试的一段标题789",
  content:
    "这是测试的一大段内容这是测试的一大段内容这是测试的一大段内容这是测试的一大段内容",
  nicecount: 4,
  viewcount: 14,
  review: '1',
  message: "评审通过",
  'AdminId': 3,
  'LabelId': "7",
};
// addArticle(obj).then(res => {
//   console.log("46",res);
// }).catch(err => {
//   console.log("错误48",err)
// })

// addArticle(obj).then(a => {
//   console.log(a)
// })

// 修改
// updateArticle(123,obj).then(res => {
//   console.log(res)
// })

// 删除
// deleteArticle(123).then(res => {
//   console.log(res)
// })