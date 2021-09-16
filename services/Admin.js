const md5 = require("md5");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const { pick } = require("../utils/pick");
const UserInfo = require("../models/UserInfo");
const { addUserInfo } = require("../services/UserInfo");
const validate = require("validate.js");
const Admin = require("../models/Admin");
// 用户的增删改查
// 新增用户
const addAdmin = async (userObj) => {
  // 新增用户
  // 1.判断用户是否存在，如果存在不能添加
  // 2.对用户名密码进行限制
  // 3.对密码进行加密
  userObj = pick(userObj, "author", "username", "password");
  const temp = await Admin.findOne({
    where: {
      username: userObj.username,
    },
  });

  if (!temp) {
    // 不存在该用户 可以添加
    // 对信息进行验证
    const rules = {
      author: {
        presence: {
          allowEmpty: false,
        },
        type: "string",
        length: {
          minimum: 2,
          maximum: 10,
          message: "must be length is 1-10",
        },
      },
      username: {
        presence: {
          allowEmpty: false,
        },
        type: "string",
        length: {
          minimum: 6,
          maximum: 20,
          message: "must be length is 6-20",
        },
      },
      password: {
        presence: {
          allowEmpty: false,
        },
        type: "string",
        format: {
          pattern:
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/,
          flags: "i",
          message:
            "密码必须包含一个大写字母，一个小写字母，一个数字，一个特殊字符，8位以上",
        },
      },
    };
    await validate.async(userObj, rules);
    // 此时添加一条用户信息
    // 再将用户信息的id设置为用户表的外键
    const info = await addUserInfo();
    userObj.UserInfoId = info.id;
    userObj.password = md5(userObj.password);
    const ins = Admin.build(userObj);
    const res = await ins.save();
    const result = res.toJSON();
    return {
      id: result.id,
      author: result.author,
      username: result.username,
    };
  } else {
    return null;
  }
};

// 修改用户
// 只能修改昵称和密码
const updateAdmin = async ( userObj) => {
  userObj = pick(userObj,"id", "author", "password");
  // 此时需要对用户名密码进行验证
  const rules = {
    author: {
      presence: {
        allowEmpty: true,
      },
      type: "string",
      length: {
        minimum: 2,
        maximum: 10,
        message: "must be length is 1-10",
      },
    },
    password: {
      presence: {
        allowEmpty: false,
      },
      type: "string",
      format: {
        pattern:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/,
        flags: "i",
        message:
          "密码必须包含一个大写字母，一个小写字母，一个数字，一个特殊字符，8位以上",
      },
    },
  };
  await validate.async(userObj, rules)
  userObj.password = md5(userObj.password);
  let result = await Admin.update(userObj, {
    where: {
      id: userObj.id,
    },
  });
  if (Array.isArray(result)) {
    return result[0] ? "更新成功" : "更新失败";
  } else {
    return result ? "更新成功" : "更新失败";
  }
};

// 删除用户
const deleteAdmin = async (userId) => {
  const result = await Admin.destroy({
    where: {
      id: userId,
    },
  });
  if (Array.isArray(result)) {
    return result[0] ? "删除成功" : "删除失败";
  } else {
    return result ? "删除成功" : "删除失败";
  }
};

// 利用用户名密码获取用户信息 登录
const login = async (username, password) => {
  password = md5(password);
  const result = await Admin.findOne({
    attributes: ["id", "username", "author"],
    where: {
      username,
      password,
    },
  });
  if (result && result.username == username) {
    return result.toJSON();
  }
  return null;
};

// 利用主键获取用户信息(包括用户个人资料)
const getUserInfoDetail = async (id) => {
  if (!id) {
    return;
  }
  const result = await Admin.findOne({
    attributes: ["id", "username", "author", "UserInfoId"],
    where: {
      id,
    },
    include: {
      model: UserInfo,
      attributes: ["avatar", "birthday", "sex", "tel", "email", "id"],
      // as: "info",
    },
  });
  return result.toJSON();
};

// 获取所有用户信息
// 作者名模糊查询
const getUserInfoAll = async (page = 1, size = 10, author = "") => {
  let options = {};
  if (author) {
    options.author = {
      [Op.like]: `%${author}%`,
    };
  }
  const res = await Admin.findAndCountAll({
    attributes: ["id", "username", "author","UserInfoId"],
    offset: (page - 1) * size,
    limit: +size,
    where:options,
    include: {
      model: UserInfo,
      attributes: ["avatar", "birthday", "age", "sex", "id", "tel", "email"],
      // as: "info",
    },
  });
  return {
    data: JSON.parse(JSON.stringify(res.rows)),
    total: res.count,
    size: size,
  };
};

module.exports = {
  addAdmin,
  updateAdmin,
  deleteAdmin,
  login,
  getUserInfoDetail,
  getUserInfoAll
};
