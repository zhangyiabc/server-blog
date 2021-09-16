/*
 * @Author: your name
 * @Date: 2021-09-02 21:23:28
 * @LastEditTime: 2021-09-03 10:00:20
 * @LastEditors: Please set LastEditors
 * @Description: 评论表字段初始化
 * @FilePath: \server\models\Comment.js
 */

const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");

const Comment = sequelize.define(
  "Comment",
  {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nicecount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    createdAt: true, // 是否设置创建时间字段
    updatedAt: false, // 是否设置更新时间字段
    paranoid: true, // 软删除
  }
);

module.exports = Comment;
