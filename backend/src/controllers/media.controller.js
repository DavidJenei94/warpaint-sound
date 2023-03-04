import media from '../services/media.service.js';
import config from "../configs/general.config.js"

const get = async (req, res, next) => {
  try {
    if (config.environment === 'development') {
      // Media files stored permanently in /uploads folder in development
      media.getFromLocal(res, req.params.filePath);
    } else if (config.environment === 'production') {
      // In production files are stored in S3 bucket (only temporarily in uploads)
      media.getFromAWS(res, req.params.filePath);
    }
  } catch (err) {
    console.error(`Error while getting Sound Record Media:`, err.message);
    next(err);
  }
};

export default { get };
