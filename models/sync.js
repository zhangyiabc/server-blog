// 同步所有模型
require("./Admin");
require('./Article')
require('./Comment')
require('./Label')
require('./SuperAdmin')
require('./UserInfo')
const { sequelize } = require("../config/db");
sequelize.sync({ alter: true }).then((res) => {
  console.log("所有模型已同步");
  // console.log(res)
});
