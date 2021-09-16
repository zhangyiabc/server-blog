/*
 * @Author: your name
 * @Date: 2021-09-02 10:34:27
 * @LastEditTime: 2021-09-02 11:17:32
 * @LastEditors: Please set LastEditors
 * @Description: 阿里云oss文件上传的方法
 * @FilePath: \3.nodejs-mysql-test\utils\ossUpload.js
 */
const { client } = require('../config/oss')

async function ossPutFunc(filename, pathDir) {
  try {
    // 填写OSS文件完整路径和本地文件的完整路径。OSS文件完整路径中不能包含Bucket名称。
    // 如果本地文件的完整路径中未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
    const result = await client.put(filename, pathDir);
    // console.log(result);
    return result
  } catch (e) {
    // console.log(21 + "hang")
    // console.log(e);
    return e
  }
}



module.exports = { ossPutFunc }