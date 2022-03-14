const DBHelp = require('./db_help');

class TicketModel {

  /**
   * 构造函数
   * 
   * @param {Object} options 
   */
  constructor({
    ticket,
    expires,
    createTimeStamp = Date.now()
  }) {
    this.ticket = ticket;
    this.expires = expires * 1000;
    this.createTimeStamp = createTimeStamp;
  }

  /**
   * 
   * 当前 TICKET 是否已过期
   * 
   * @returns Flase 未到期, True 已过期
   */
   isExpires() {
    return Date.now() >= (this.createTimeStamp + this.expires);
  }

  /**
   * 持久化保持到数据库
   */
  save() {
    new DBHelp().set('TICKET', this, this.expires);
  }

  /**
   * 获取全局单一的用于调用微信JS接口的临时票据 TICKET
   * 如果存在, 则返回一个 TicketModel 实例; 反之, 为 NULL
   * 
   * @returns 
   */
   static async getInstance() {
    const db = new DBHelp();
    let ticketModel = null;
    if (await db.isExists('TICKET')) {
      let data = await db.get('TICKET');
      ticketModel = new TicketModel(data);
    }
    return ticketModel;
  }
}

module.exports = TicketModel;
