import jwt from 'jsonwebtoken';
import config from '../configs/general.config.js';
import HttpError from '../utils/HttpError.js';

const login = async (password) => {
  // Check i password sent
  if (!password) {
    throw new HttpError('Password is required.', 400);
  }

  // Validate if password is correct
  if (password !== process.env.DB_PASSWORD) {
    throw new HttpError('Wrong Password.', 401);
  }

  // Create token
  const token = jwt.sign({ role: 'admin' }, config.tokenKey, {
    expiresIn: config.expiryTime,
  });

  return {
    message: 'Successful login.',
    token,
  };
};

const refresh = async () => {
  // Create new token
  const token = jwt.sign({ role: 'admin' }, config.tokenKey, {
    expiresIn: config.expiryTime,
  });

  return {
    message: 'Successful token refresh.',
    token,
  };
};

export default {
  login,
  refresh,
};
