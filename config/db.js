/*
 * @Author: your name
 * @Date: 2021-09-02 21:20:25
 * @LastEditTime: 2021-09-03 09:40:23
 * @LastEditors: Please set LastEditors
 * @Description: 连接数据库的一些配置
 * @FilePath: \server\config\db.js
 */
const { Sequelize } = require("sequelize");
const {sqlLogger} = require('./logger')
const sequelize = new Sequelize("myblogs", "root", "1120768996", {
  host: "101.200.149.141",
  dialect: "mysql",
  logging: (msg) => {
    sqlLogger.debug(msg)
  },
});

module.exports = {
  sequelize,
};
