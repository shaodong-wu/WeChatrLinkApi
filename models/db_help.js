const { createClient } = require('redis');

class DBHelp {

  /**
   * 构造函数
   */
  constructor() {
    this.client;
  }

  /**
   * 建立Redis客户端链接
   */
  async _connect() {

    if (this.client) return;

    if (!DBHelp.instance) {
      this.client = createClient();

      this.client.on('error', (err) => {
        throw new Error('Redis Client Error: ', err);
      });

      await this.client.connect();
      DBHelp.instance = this.client;
    }
    this.client = DBHelp.instance;
  }

  /**
   * 储存相关的内容
   * 
   * @param {String} key      唯一值
   * @param {Object} value    储存的内容
   * @param {Number} expires  过期时间, 单位: 秒
   */
  async set(key, value, expires) {
    await this._connect();
    await this.client.set(key, JSON.stringify(value), {
      PX: expires ?? 0
    });
  }

  /**
   * 获取相关的内容
   * 
   * @param {String} key    唯一值
   * @returns 返回一个Object对象
   */
  async get(key) {
    await this._connect();
    let result = await this.client.get(key);
    return JSON.parse(result);
  }

  /**
   * 检测唯一值(key)是否存在
   * 
   * @param {String} key 唯一值
   * @returns 布尔值
   */
  async isExists(key) {
    await this._connect()
    return await this.client.exists(key);
  }

}

module.exports = DBHelp;
