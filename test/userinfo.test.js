// 用户信息的增删改查
const {addUserInfo,updateUserInfo} = require('../services/UserInfo')
require('../services/init')
// 新增
var obj = {
  // avatar:"",
  birthday:"2010-02-03",
  tel:"13085296112",
  email:"1120768996@qq.com"
}
// addUserInfo(obj).then(res => {
//   console.log(res)
// }).catch(err => {
//   console.log(err)
// })


// 修改用户信息
// updateUserInfo(5,obj).then(res => {
//   console.log(res)
// }).catch(err => {
//   console.log(err)
// })