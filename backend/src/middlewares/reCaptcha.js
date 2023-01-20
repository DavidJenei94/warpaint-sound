import fetch from 'node-fetch';
import config from '../configs/general.config.js';

const verifyReCaptcha = async (req, res, next) => {
  const token = req.body.reCaptchaToken;

  if (!token) {
    return res.status(403).send('No token provided for reCaptcha.');
  }

  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
    );
    const data = await response.json();

    if (
      (data.action === 'addsoundrecord' ||
        data.action === 'reportsoundrecord') &&
      data.score <= config.reCaptchaThresholdScore
    ) {
      throw new Error('User score for reCaptcha is too low.');
    }

    // reCaptcha token verified
    if (response.status === 200) {
      return next();
    }
  } catch (err) {
    return res.status(401).send('Invalid Token! Suspicious user behaviour!');
  }
};

export default verifyReCaptcha;
