/*
 * @Author: your name
 * @Date: 2021-09-03 09:43:25
 * @LastEditTime: 2021-09-03 09:43:25
 * @LastEditors: Please set LastEditors
 * @Description: 设置表关联
 * @FilePath: \server\models\relation.js
 */

const Admin = require('./Admin')
const Article = require('./Article')
const Comment = require('./Comment')
const Label = require('./Label')
const UserInfo = require('./UserInfo')

// 用户信息与用户一对一关系
UserInfo.hasOne(Admin)
Admin.belongsTo(UserInfo)

// 文章与用户一对多关系
Admin.hasMany(Article)
Article.belongsTo(Admin)

// 文章与评论一对多的关系
Article.hasMany(Comment)
Comment.belongsTo(Article)

// 文章与标签一对一的关系
Label.hasOne(Article)
Article.belongsTo(Label)

// 用户与评论一对多关系
Admin.hasMany(Comment)
Comment.belongsTo(Admin)