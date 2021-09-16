/*
 * @Author: your name
 * @Date: 2021-09-02 21:21:14
 * @LastEditTime: 2021-09-02 21:32:06
 * @LastEditors: Please set LastEditors
 * @Description: 日志记录的一些配置
 * @FilePath: \server\config\logger.js
 */
const log4js = require("log4js");
const path = require("path");

function getCommonAppend(pathDir) {
  return {
    type: "dateFile",
      filename: path.resolve(__dirname, "..", "logs", pathDir, "logging.log"),
      maxLogSize: 1024 * 50, // 文件的最大字节数
      keepFileExt: true, //保留文件后缀
      daysToKeep: 5, // 保留几天
      layout: {
        type: "pattern",
        pattern: "[%c] [%d{yyyy-MM-dd hh:mm:ss}] [%p]: %m%n",
      },
  };
}

log4js.configure({
  appenders: {
    sql: getCommonAppend("sql"), //出口名称
    default: {
      type: "file",
      filename: path.resolve(__dirname, "..", "logs", "default", "logging.log"),
    },
    api: getCommonAppend("api"),
  },
  categories: {
    sql: {
      appenders: ["sql"], //该分类使用出口sql配置写入日志
      level: "all",
    },
    default: {
      appenders: ["default"],
      level: "all",
    },
    api: {
      appenders: ["api"],
      level: "all",
    },
  },
});

const sqlLogger = log4js.getLogger("sql");
const defaultLogger = log4js.getLogger();
const apiLogger = log4js.getLogger('api')

module.exports = { sqlLogger, defaultLogger,apiLogger };
