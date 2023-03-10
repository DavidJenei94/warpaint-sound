import path from 'path';
import { fileURLToPath } from 'url';

// To Replicate __ dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const general = {
  expiryTime: '1h', // 1 * 24 * 60 * 60 = one day or "1h" for one hour, for admin token
  tokenKey: process.env.TOKEN_KEY,

  reCaptchaThresholdScore: 0.3,

  environment: process.env.ENVIRONMENT,

  frontendUrl: process.env.FRONTEND_URL,

  dirname: __dirname,
};

export default general;
