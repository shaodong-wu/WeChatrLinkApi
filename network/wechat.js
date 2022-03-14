const request = require('./request');
const {
  APP_ID,
  APP_SECRET
} = require('../config').WeChatPublic;
const TokenModel = require('../models/token');
const TicketModel = require('../models/ticket');


/**
 * 
 * 获取公众号的全局唯一接口调用凭据 access_token
 * 
 * @returns 
 */
let getAccessToken = () => {
  return request({
    url: '/cgi-bin/token',
    params: {
      grant_type: 'client_credential',
      appid: APP_ID,
      secret: APP_SECRET
    },
    transformResponse: [function (data) {
      const result = JSON.parse(data);
      if (!result.errcode || result.errcode === 0) {
        return new TokenModel({
          accessToken: result.access_token,
          expires    : result.expires_in,
        });
      }
      throw new Error('[GetAccessToken Request Error]: ', result.errmsg ?? result);
    }]
  });
}


/**
 * 
 * 获取公众号用于调用微信JS接口的临时票据 TICKETS
 * 
 * @returns 
 */
let getTicket = (access_token) => {
  return request({
    url: '/cgi-bin/ticket/getticket',
    params: {
      access_token,
      type: 'jsapi'
    },
    transformResponse: [function (data) {
      const result = JSON.parse(data);
      if (!result.errcode || result.errcode === 0) {
        console.log("ok?");
        return new TicketModel({
          ticket : result.ticket,
          expires: result.expires_in,
        });
      }
      throw new Error('[GetTicket Request Error]: ', result.errmsg ?? result);
    }]
  });
}


module.exports = { getTicket, getAccessToken}
