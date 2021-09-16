/*
 * @Author: your name
 * @Date: 2021-09-02 21:24:31
 * @LastEditTime: 2021-09-03 09:53:23
 * @LastEditors: Please set LastEditors
 * @Description: 管理员表字段初始化
 * @FilePath: \server\models\superAdmin.js
 */
const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");

const SuperAdmin = sequelize.define(
  "SuperAdmin",
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 头像
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "https://test-zyd.oss-cn-beijing.aliyuncs.com/pig.png",
    },
  },
  {
    createdAt: true, // 是否设置创建时间字段
    updatedAt: false, // 是否设置更新时间字段
    paranoid: true, // 软删除
  }
);
module.exports = SuperAdmin