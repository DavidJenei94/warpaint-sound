import auth from '../services/auth.service.js';

const login = async (req, res, next) => {
  try {
    res.status(200).json(await auth.login(req.body.password));
  } catch (err) {
    console.error(`Error while logging in:`, err.message);
    next(err);
  }
};

const refresh = async (req, res, next) => {
  try {
    res.status(200).json(await auth.refresh());
  } catch (err) {
    console.error(`Error while refreshing token:`, err.message);
    next(err);
  }
};

export default {
  login,
  refresh
};
