import jwt from 'jsonwebtoken';
import config from '../configs/general.config.js';
import HttpError from '../utils/HttpError.js';

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    return next(new HttpError('A token is required for authentication', 403));
  }
  try {
    jwt.verify(token, config.tokenKey);
  } catch (err) {
    return next(new HttpError('Invalid Token', 401));
  }
  return next();
};

export default verifyToken;
