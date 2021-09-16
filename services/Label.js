const Label = require('../models/Label')
// 新增文章标签
const addLabel = async (typeObj)=>{
  const temp = await Label.findOne({
    where:{
      tag:typeObj.tag
    }
  });
  if(!temp){
    const ins = Label.build(typeObj)
    const result = await ins.save()
    // console.log(result)
    return result.toJSON()
  }else{
    return `${typeObj.tag}已存在`
  }
}

// 删除文章标签
const deleteLabel = async (tagId) => {
  const did = await Label.destroy({

    where: {
      id: tagId,
    },
  });
  if (Array.isArray(did)) {
    return did[0] ? "删除成功" : "删除失败";
  } else {
    return did ? "删除成功" : "删除失败";
  }
}

// 查看所有标签
const getAllLabel = async () => {
  const result = await Label.findAndCountAll({
    attributes:["id","tag"]
  })
  return JSON.parse(JSON.stringify(result.rows))
}

// 查看单个标签 
const getDetailLabel = async (tagId) => {
  const res = await Label.findAndCountAll({
    attributes: ["id", "tag"],
    where: {
      id:tagId,
    }
  });
  return JSON.parse(JSON.stringify(res.rows))
}

// 修改标签
const updateLabel = async (tagId,tagObj) => {
  if(!tagId){
    return
  }
  const result = await Label.update(tagObj,{
    where:{
      id:tagId
    }
  })
  if (Array.isArray(result)) {
    return result[0] ? "更新成功" : "更新失败";
  } else {
    return result ? "更新成功" : "更新失败";
  }
}

module.exports = {
  getAllLabel,
  updateLabel,
  getDetailLabel,
  addLabel,
  deleteLabel
}