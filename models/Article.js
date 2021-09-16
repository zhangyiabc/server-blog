/*
 * @Author: your name
 * @Date: 2021-09-02 21:22:55
 * @LastEditTime: 2021-09-03 09:56:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \server\models\Article.js
 */
const moment = require("moment");
const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");
const Article = sequelize.define(
  "Article",
  {
    // 文章封面
    cover: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 标题
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 内容
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // nicecount点赞次数
    nicecount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    // viewcount 浏览次数
    viewcount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    // 评论次数
    commentcount: {
      type: DataTypes.VIRTUAL,
      // get() {
      //   const now = moment().utc();
      //   const birth = moment.utc(this.createdAt);
      //   return now.diff(birth, "d");
      // },
    },
    time: {
      type: DataTypes.VIRTUAL,
      get() {
        const now = moment().utc();
        const birth = moment.utc(this.createdAt);
        const res = now.diff(birth, "d");
        return res
      },
    },
    // // 文章所属标签
    // types: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    // 评审 0表示全部，1表示通过，2表示未通过，3表示等待评审中
    review: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 3,
    },
    // 评审结果--原因
    message: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    createdAt: true, // 是否设置创建时间字段
    updatedAt: false, // 是否设置更新时间字段
    paranoid: true, // 软删除
  }
);
module.exports = Article;
