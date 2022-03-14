const DBHelp = require('./db_help');

class TokenModel {

  /**
   * 构造函数
   * 
   * @param {Object} options
   */
  constructor({
    accessToken, 
    expires, 
    createTimeStamp = new Date().getTime()
  }) {
    this.accessToken = accessToken;
    this.expires = expires * 1000;
    this.createTimeStamp = createTimeStamp;
  }

  /**
   * 
   * 当前 access_token 是否已过期
   * 
   * @returns True 未到期, Flase 已过期
   */
  isExpires() {
    return Date.now() >= (this.createTimeStamp + this.expires);
  }

  /**
   * 持久化保持到数据库
   */
  save() {
    new DBHelp().set('ACCESS_TOKEN', this, this.expires);
  }

  /**
   * 获取全局单一公众号 ACCESS_TOKEN
   * 如果存在, 则返回一个 TokenModel 实例; 反之, 为 NULL
   * 
   * @returns 
   */
  static async getInstance() {
    const db = new DBHelp();
    let tokenModel = null;
    if (await db.isExists('ACCESS_TOKEN')) {
      let data = await db.get('ACCESS_TOKEN');
      tokenModel = new TokenModel(data);
    }
    return tokenModel;
  }

}

module.exports = TokenModel;