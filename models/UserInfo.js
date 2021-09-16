/*
 * @Author: your name
 * @Date: 2021-09-02 22:02:22
 * @LastEditTime: 2021-09-02 22:04:52
 * @LastEditors: Please set LastEditors
 * @Description: 用户信息表
 * @FilePath: \server\models\userInfo.js
 */
const { sequelize } = require("../config/db");
const moment = require('moment')
const { DataTypes } = require("sequelize");
const UserInfo = sequelize.define(
  "UserInfo",
  {
    // 用户头像
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:
        "http://test-zyd.oss-cn-beijing.aliyuncs.com/zhangyida/0417307-teudpo.jpg",
    },
    // 生日
    birthday: {
      type: DataTypes.DATE,
      allowNull: true,
      
      get() {
        if (this.getDataValue("birthday")) {
          return this.getDataValue("birthday").getTime();
        }
        return;
      },
    },
    sex: {
      type: DataTypes.BOOLEAN,
      defaultValue:true,
      allowNull: false,
    },
    // 设置虚拟字段  通过birthday计算出
    age: {
      type: DataTypes.VIRTUAL,
      get() {
        const now = moment().utc();
        const birth = moment.utc(this.birthday);
        return now.diff(birth, "y");
      },
    },
    tel: {
      type: DataTypes.STRING(11),
      allowNull: true,
    },
    email: {
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
module.exports = UserInfo
