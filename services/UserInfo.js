// 用户信息的增删改查
const UserInfo = require("../models/UserInfo");
const validate = require("validate.js");
const { pick } = require("../utils/pick");
const moment = require('moment')
// 规则
const rules = {
  birthday: {
    presence: undefined,
    datetime: {
      dateOnly: true,
      earliest: +moment.utc().subtract(100, "y"),
      latest: +moment.utc().subtract(5, "y"),
    },
  },
  sex: {
    presence: undefined,
    type: "boolean",
  },
  tel: {
    presence: undefined,
    type:'string',
    format: {
      pattern:
        /^1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
      message: "number is out of specification",
    },
  },
};
// 新增一个用户信息
const addUserInfo = async (userInfoObj) => {
  userInfoObj = pick(userInfoObj, "avatar", "birthday", "sex", "tel", "email");
  // 需要对用户信息进行验证，所有都可以为空但是值必须得符合要求
  await validate.async(userInfoObj, rules);

  const ins = UserInfo.build(userInfoObj);
  const res = await ins.save();
  return res.toJSON();
};

// 修改用户信息
const updateUserInfo = async (userInfoId, userInfoObj) => {
  if (!userInfoId) {
    return null;
  }
  userInfoObj = pick(userInfoObj, "avatar", "birthday", "sex", "tel", "email");
  userInfoObj.sex = !!userInfoObj.sex
  // 需要对用户信息进行验证
  await validate.async(userInfoObj, rules);

  const res = await UserInfo.update(userInfoObj, {
    where: {
      id: userInfoId,
    },
  });
  if (Array.isArray(res)) {
    return res[0] ? "更新成功" : "更新失败";
  } else {
    return res ? "更新成功" : "更新失败";
  }
};

// 删除用户信息

module.exports = {
  addUserInfo,
  updateUserInfo,
};
