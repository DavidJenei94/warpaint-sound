const general = {
  expiryTime: '1h', // 1 * 24 * 60 * 60 = one day or "1h" for one hour
  tokenKey: process.env.TOKEN_KEY,

  reCaptchaThresholdScore: 0.3,
};

export default general;
