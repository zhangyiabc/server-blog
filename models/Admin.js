/*
 * @Author: your name
 * @Date: 2021-09-02 21:21:31
 * @LastEditTime: 2021-09-02 22:05:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \server\models\Admin.js
 */
const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");
const Admin = sequelize.define(
  "Admin",
  {
    // 账号
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 密码
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 用户名
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
  },
  {
    createdAt: true, // 是否设置创建时间字段
    updatedAt: false, // 是否设置更新时间字段
    paranoid: true, // 软删除
  }
);

module.exports = Admin;
