/**
 * 批量自动注册路由文件 Express-Router
 * 使用第三方NPM包 `Glob` 快速匹配 Controllers 文件夹下的 JS 文件
 * 也可以直接使用 Nodejs 的核心模块 `path` 对目录进行递归遍历
 * 约定: 从根目录开始, 文件的路径为 API接口的访问路径
 * 
 * @author wu_shaodong
 * @date   2022-01-27 22:32:00
 * @modify 2022-01-27 22:32:00
 * @version 0.0.1
 */
const express = require('express');
const router = express.Router();
const glob = require('glob');
const path = require('path');

const {
  root,
  controllers
} = require('./config').PathInfo;
const filedir = path.join(root, controllers)


glob.sync(`${filedir}/**/*.js`).forEach( files => {
  const fileName = files.replace(filedir, '')
                        .replace('.js', '');
  const route = require(files);
  router.use(fileName, route);
});

module.exports = router;
 