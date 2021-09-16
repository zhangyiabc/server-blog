/**
 * 测试标签表的功能
 */

const {getAllLabel,getDetailLabel,deleteLabel} = require('../services/Label')
// // 获取全部标签
// getAllLabel().then(res => {
//   console.log(res)
// })

// 获取单个标签
// getDetailLabel(4).then(res => {
//   console.log(res)
// })

// 删除标签
deleteLabel(24).then(res => {
  console.log(res)
})