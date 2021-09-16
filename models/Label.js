/*
 * @Author: your name
 * @Date: 2021-09-03 09:56:23
 * @LastEditTime: 2021-09-03 09:58:48
 * @LastEditors: Please set LastEditors
 * @Description: 文章标签表
 * @FilePath: \server\models\label.js
 */
const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");

const Label = sequelize.define(
  "Label",
  {
    tag: {
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

module.exports = Label