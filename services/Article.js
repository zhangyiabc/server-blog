const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const validate = require("validate.js");
// 文章的增删改查
const Article = require("../models/Article");
const Admin = require("../models/Admin");
const Label = require("../models/Label");
const { pick } = require("../utils/pick");
const UserInfo = require("../models/UserInfo");
// 对文章进行验证
// 拓展验证外键的方法
// 验证用户是否存在
validate.validators.AdminIsExist = async (value) => {
  const c = await Admin.findByPk(+value);
  // console.log("16", c);
  if (c) {
    // console.log("在这里，拿到了用户")
    // return c.toJSON();
    return;
  } else {
    // console.log("在这里，没有拿到用户")
    return "can't find";
  }
};

// 验证标签是否存在
validate.validators.LabelIsExist = async (value) => {
  if(!value){
    return
  }
  const c = await Label.findByPk(value);
  if (c) {
    return;
  } else {
    return "can't find";
  }
};

// 增加文章
const addArticle = async (articleObj) => {
  articleObj = pick(
    articleObj,
    "cover",
    "title",
    "content",
    "nicecount",
    "viewcount",
    "review",
    "message",
    "LabelId",
    "AdminId"
  );

  // 用于新增文章修改文章时都需要验证数据的可靠性
  const rules = {
    // 封面
    cover: {
      presence: {
        allowEmpty: false,
      },
      type: "string",
    },
    title: {
      presence: {
        allowEmpty: false,
      },
      length: {
        minimum: 2,
        maximum: 50,
        message: "must be length is 1-50",
      },
      type: "string",
    },
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
      type: "integer",
    },
    viewcount: {
      presence: {
        allowEmpty: false,
      },
      type: "integer",
    },
    review: {
      presence: {
        allowEmpty: false,
      },
      numericality: {
        onlyInteger: true,
        strict: false,
      }
    },
    message: {
      presence: {
        allowEmpty: true,
      },
    },
    AdminId: {
      presence: {
        allowEmpty: false,
      },
      numericality: {
        onlyInteger: true,
        strict: false,
      },
      // 拓展的方法
      AdminIsExist: true,
    },
    LabelId: {
      presence: {
        allowEmpty: false,
      },
      numericality: {
        onlyInteger: true,
        strict: false,
      },
      // 拓展的方法
      LabelIsExist: true,
    },
  };
  await validate.async(articleObj, rules);
  // 验证通过后添加到数据库
  const ins = Article.build(articleObj);
  const res = await ins.save();
  const result = res.toJSON();
  return result;
};

// 删除文章
const deleteArticle = async (articleId) => {
  if (!articleId) {
    return null;
  }
  const res = await Article.destroy({
    where: {
      id: articleId,
    },
  });
  if (Array.isArray(res)) {
    return res[0] ? "删除成功" : "删除失败";
  } else {
    return res ? "删除成功" : "删除失败";
  }
};

// 查看所有文章(可以筛选)
// 筛选条件
/**
 * 1.文章标题
 * 2.文章作者
 * 3.文章标签
 * 4.审核结果
 */
const getArticleAll = async (
  page = 1,
  size = 10,
  title = "",
  review = "0",
  LabelId = -1,
  AdminId = ""
) => {
  let options = {};
  // 标题模糊查询
  if (title) {
    options.title = {
      [Op.like]: `%${title}%`,
    };
  }
  if (LabelId != -1) {
    options.LabelId = LabelId;
  }
  if (+review) {

    options.review = review;
  }
  if (AdminId) {
    options.AdminId = AdminId;
  }

  const res = await Article.findAndCountAll({
    attributes: [
      "id",
      "cover",
      "title",
      "time",
      "LabelId",
      "content",
      "AdminId",
      "nicecount",
      "review",
      "message",
      "createdAt",
    ],
    offset: (page - 1) * size,
    limit: +size,
    where: options,
    include: [
      {
        model: Label,
        attributes: ["tag"],
      },
      {
        model: Admin,
        attributes: ["username", "author", "id"],
        include: [
          {
            model: UserInfo,
            attributes: ["birthday", "age", "avatar", "sex", "tel", "email"],
          },
        ],
      },
    ],
  });
  return {
    data: JSON.parse(JSON.stringify(res.rows)),
    total: res.count,
    size: size,
  };
};

// 查看文章详情
const getArticleDetail = async (articleId) => {
  if (!articleId) {
    return null;
  }
  const res = await Article.findAndCountAll({
    attributes: [
      "id",
      "cover",
      "title",
      "time",
      "LabelId",
      "content",
      "AdminId",
      "viewcount",
      "nicecount",
      "review",
      "message",
      "createdAt",
    ],
    where: {
      id: articleId,
    },
    include: [
      {
        model: Label,
        attributes: ["tag"],
      },
      {
        model: Admin,
        attributes: ["username", "author", "id"],
        // include: [
        //   {
        //     model: UserInfo,
        //     attributes: ["birthday", "age", "avatar", "sex", "tel", "email"],
        //   },
        // ],
      },
    ],
  });
  // 此时需要给文章的访问量增加一个
  const data = JSON.parse(JSON.stringify(res.rows))
  data[0].viewcount = +data[0].viewcount + 1 
  await updateArticle(data[0].id,{viewcount:data[0].viewcount})
  return {
    data,
    total: res.count,
  };
};

// 修改文章
const updateArticle = async (articleId, articleObj) => {
  if (!articleId) {
    return null;
  }
  articleObj = pick(
    articleObj,
    "cover",
    "title",
    "content",
    "nicecount",
    "viewcount",
    "review",
    "message",
    "LabelId"
  );
  const rules = {
    // 封面
    cover: {
      presence: undefined,
      type: "string",
    },
    title: {
      presence: undefined,
      length: {
        minimum: 2,
        maximum: 50,
        message: "must be length is 1-50",
      },
      type: "string",
    },
    content: {
      presence: undefined,
      type: "string",
    },
    nicecount: {
      presence: undefined,
      type: "integer",
    },
    viewcount: {
      presence: undefined,
      type: "integer",
    },
    review: {
      presence: undefined,
      numericality: {
        onlyInteger: true,
        strict: false,
      },
    },
    message: {
      presence: undefined,
    },
    LabelId: {
      presence: undefined,
      numericality: {
        onlyInteger: true,
        strict: false,
      },
      // 拓展的方法
      LabelIsExist: true,
    },
  };
  await validate.async(articleObj, rules);
  // 验证通过更改数据库信息
  const res = await Article.update(articleObj, {
    where: {
      id: articleId,
    },
  });

  if (Array.isArray(res)) {
    return res[0] ? "更新成功" : "更新失败";
  } else {
    return res ? "更新成功" : "更新失败";
  }
};

// 文章点赞
const giveArticleNice = async (articleId) => {
  if (!articleId) {
    return null;
  }
  let articleInfo = await getArticleDetail(articleId);
  articleInfo = articleInfo.data[0];
  articleInfo.nicecount = +articleInfo.nicecount + 1;
  const result = await updateArticle(articleInfo.id, articleInfo);
  if (result == "更新成功") {
    return "点赞成功";
  } else {
    return "点赞失败";
  }
};

// 修改文章发布状态
// 只可修改
const updateStatus = async (articleObj) => {
  if(!articleObj.id){
    return
  }
  articleObj = pick(
    articleObj,
    "id",
    "review",
    "message"
  );
  const rules = {
    review: {
      presence: true,
      numericality: {
        onlyInteger: true,
        strict: false,
      },
    },
    message: {
      presence: {
        allowEmpty: true,
      },
    },
  };
  await validate.async(articleObj, rules);
  const res = await Article.update(articleObj, {
    where: {
      id: articleObj.id,
    },
  });
  if (Array.isArray(res)) {
    return res[0] ? "修改成功" : "修改失败";
  } else {
    return res ? "修改成功" : "修改失败";
  }
}

module.exports = {
  updateStatus,
  addArticle,
  giveArticleNice,
  deleteArticle,
  getArticleAll,
  updateArticle,
  getArticleDetail,
};
