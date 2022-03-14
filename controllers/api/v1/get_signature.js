const express = require('express');
const router = express.Router();
const {
  getAccessToken,
  getTicket
} = require('../../../network/wechat');
const sign = require('../../../utils/wechat_sign');

const TokenModel = require('../../../models/token');
const TicketModel = require('../../../models/ticket');

router.get('/', async (req, res, next) => {
  const fullURL = req.query.url;
  let ticketModel = await TicketModel.getInstance();

  if (!ticketModel || ticketModel.isExpires()) {
    let tokenModel = await TokenModel.getInstance();
    tokenModel = tokenModel === null ? await getAccessToken() : tokenModel;
    ticketModel = await getTicket(tokenModel.accessToken);
    tokenModel.save();
    ticketModel.save();
  }

  let signInfo = sign(ticketModel.ticket, fullURL);
  return res.json({ status: 'success', result: signInfo });
});

module.exports = router;