module.exports = function headers(req, res, next) {
  try {
    const { headers: { origin = '*' } } = req;
    const allowOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
    ];
    if (allowOrigins.includes(origin) || 1) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
      res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE,PATCH');
    }
    next();
  } catch (e) {
    next(e);
  }
}
