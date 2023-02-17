import path from 'path';
import { fileURLToPath } from 'url';

import media from '../services/media.service.js';

// To Replicate __ dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const get = async (req, res, next) => {
  try {
    if (process.env.ENVIRONMENT === 'development') {
      const relativeMainIndex = __dirname.indexOf("/src/");
      const mainPath = __dirname.substring(0, relativeMainIndex)

      // Media files stored permanently in /uploads folder in development
      res.sendFile(`${mainPath}/uploads/${req.params.filePath}`);
    } else if (process.env.ENVIRONMENT === 'production') {
      // In production files are stored in S3 bucket (only temporarily in uploads)
      const mediaFile = await media.get(req.params.filePath);
      mediaFile.Body.pipe(res);
    }
  } catch (err) {
    console.error(`Error while getting Sound Record:`, err.message);
    next(err);
  }
};

export default { get };
