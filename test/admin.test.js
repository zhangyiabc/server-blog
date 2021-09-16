/**
 * 测试用户信息的功能
 */

const {
  addAdmin,
  deleteAdmin,
  updateAdmin,
  login,
  getUserInfoAll,
  getUserInfoDetail
} = require("../services/Admin");
// 测试新增
// const adminObj = {
//   author:"zyd",
//   username:"234567891",
//   password:"1120768996@Zy"
// }
// addAdmin(adminObj).then(res => {
//   console.log(res)
// }).catch(err => {
//   console.log(err)
// })

// 登录
// login('1120768996','1120768996@Zy').then(res => {
//   console.log(res)
// })

// 修改用户密码
// updateAdmin(1, { author: "孟宪宇", password: "123456@Zy" }).then(res => {
//   console.log(res)
// })

// 删除用户
// deleteAdmin('2').then(res => {
//   console.log(res)
// }).catch(err => {
//   console.log(err)
// })

// 根据id获取用户详细信息
// getUserInfoDetail(4).then(res => {
//   console.log(res)
// })

// 获取所有用户信息
getUserInfoAll().then(res => {
  console.log(res)
})