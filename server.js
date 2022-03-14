const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./router');
const errorHandler = require('./middlewares/errorHandler');

app.use(bodyParser.urlencoded({
  extends: true
}));

//设置跨域访问
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// 批量自动注册路由
app.use('/', router);

// 错误处理
app.use(errorHandler);

//配置服务端口 
app.listen(3000, () => {
  const hostname = 'localhost';
  const port = 3000;
  console.log(`Server running at http://${hostname}:${port}/`);
})