// 测试评论表的增删改查
const {addComm,getAllComm,updateComm,delComm} = require('../services/Comment')
const obj = {
  content:"这是一条评论",
  nicecount:4,
  ArticleId:121,
  AdminId:1
}
// 新增一条评论
// addComm(obj).then(res => {
//   console.log(res)
// }).catch(err => {
//   console.log(err)
// })

// 获取所有评论（文章下）
// getAllComm(1,10,91).then(res => {
//   console.log(res)
// })

// 修改评论
// updateComm(13,{nicecount:5}).then(res => {
//   console.log(res)
// })

// 删除评论
// delComm(7,3,94).then(res => {
//   console.log(res)
// })
