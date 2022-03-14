const path = require('path');

module.exports = {
  WeChatPublic: {
    APP_ID: 'wx4ddefa7d9192c760',
    APP_SECRET: '76b12472e03c97955142a50a9264331d'
  },
  NetWork: {
    BASE_URL: 'https://api.weixin.qq.com',
    TIMEOUT: 5000
  },
  PathInfo: {
    root: __dirname,
    controllers: 'controllers'
  },
  RSA: {
    publicKey: path.join(__dirname, '/publicKey.pem'),
    privateKey: path.join(__dirname, '/privateKey.pem')
  }
}