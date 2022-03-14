const errorHandler = (err, req, res, next) => {
  
  if (typeof err === 'string') {
    return res.status(400).json({ status: 'fail', message: error });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ status: 'fail', message: '请先登陆授权' });
  }

  return res.status(500).json({ status: 'fail', message: 'Internal Server Error' });
};

module.exports = errorHandler;