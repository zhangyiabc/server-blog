// 评论表的增删改查
const Comment = require("../models/Comment");
const validate = require("validate.js");
const Admin = require("../models/Admin");
const Article = require("../models/Article");
const { pick } = require("../utils/pick");
const UserInfo = require("../models/UserInfo");

// 拓展验证外键的方法
// 验证用户是否存在
validate.validators.AdminIsExist = async (value) => {
  const c = await Admin.findByPk(+value);
  if (c) {
    return;
  } else {
    return "can't find";
  }
};
// 验证文章是否存在
validate.validators.ArticleIsExist = async (value) => {
  const c = await Article.findByPk(+value);
  if (c) {
    return;
  } else {
    return "can't find";
  }
};

// 评论表的增删改查
const addComm = async (commObj) => {
  commObj = pick(commObj, "content", "nicecount", "ArticleId", "AdminId");
  const rules = {
    content: {
      presence: {
        allowEmpty: false,
      },
      type: "string",
    },
    nicecount: {
      presence: {
        allowEmpty: false,
      },
      type: "number",
    },
    ArticleId: {
      presence: {
        allowEmpty: false,
      },
      numericality: {
        onlyInteger: true,
        strict: false,
      },
      ArticleIsExist: true,
    },
    AdminId: {
      presence: {
        allowEmpty: false,
      },
      numericality: {
        onlyInteger: true,
        strict: false,
      },
      AdminIsExist: true,
    },
  };
  // 验证
  await validate.async(commObj, rules);
  const ins = Comment.build(commObj);
  const res = await ins.save();
  // 添加成功后，应该返回这条评论的具体信息
  const result = res.toJSON();
  if (result.id) {
    return getCommDetail(result.id);
  }
  // return result;
};

// 根据评论的id获取评论详情(评论作者的个人信息，评论的文章id)
const getCommDetail = async (commId) => {
  const res = await Comment.findAndCountAll({
    attributes: ["id", "nicecount", "content"],
    where: {
      id: commId,
    },
    include: {
      model: Admin,
      attributes: ["author"],
      include: {
        model: UserInfo,
        attributes: ["avatar"],
      },
    },
  });
  return JSON.parse(JSON.stringify(res.rows))[0];
};

// 删除一条评论
// 删除条件
// 文章作者可以对文章下评论随意删除
// 评论作者可以对自己的评论进行删除
const delComm = async (commId, adminId, articleId) => {
  if (!commId) {
    return "id 不存在";
  }
  // 拿到该条评论对应的文章id和用户id
  let { AdminId: getUserId } = await Comment.findByPk(commId);
  // console.log(getUserId);
  // 利用文章id获取作者id
  const res = await Article.findByPk(articleId);
  const temp = res.toJSON();
  // console.log(temp);
  console.log("文章对应的用户id", temp.AdminId);
  console.log("评论对应的用户id", getUserId);
  console.log("传入的操作者用户id", adminId);

  if (temp.AdminId != adminId && getUserId != adminId) {

    return "删除失败";
  } else {
    const result = await Comment.destroy({
      where: {
        id: commId,
      },
    });
    if (Array.isArray(result)) {
      return result[0] ? "删除成功" : "删除失败";
    } else {
      return result ? "删除成功" : "删除失败";
    }
  }
};

// 获取一个文章下的所有评论
const getAllComm = async (page = 1, size = 10, articleId = "") => {
  let options = {};
  if (articleId) {
    options.articleId = articleId;
  }
  const res = await Comment.findAndCountAll({
    attributes: ["id", "content", "nicecount", "ArticleId", "AdminId"],
    offset: (page - 1) * size,
    limit: +size,
    where: options,
    include: {
      model: Admin,
      attributes: ["author"],
      include: {
        model: UserInfo,
        attributes: ["avatar"],
      },
    },
  });
  return {
    data: JSON.parse(JSON.stringify(res.rows)),
    total: res.count,
    size: size,
  };
};

// 更新一条评论，最好只更新该评论的点赞数量
const updateComm = async (commId, commObj) => {
  if (!commId) {
    return "id 不存在";
  }
  commObj = pick(commObj, "nicecount");
  // 验证通过更改数据库信息
  const res = await Comment.update(commObj, {
    where: {
      id: commId,
    },
  });
  if (Array.isArray(res)) {
    return res[0] ? "更新成功" : "更新失败";
  } else {
    return res ? "更新成功" : "更新失败";
  }
};

// 评论点赞
const giveCommentNice = async (commId) => {
  if (!commId) {
    return "id 不存在";
  }
  const commInfo = await getCommDetail(commId);
  commInfo.nicecount = +commInfo.nicecount + 1;
  const result = await updateComm(commInfo.id, commInfo);
  if (result == "更新成功") {
    return "点赞成功";
  } else {
    return "点赞失败";
  }
};

module.exports = {
  addComm,
  delComm,
  getAllComm,
  updateComm,
  giveCommentNice,
};
