import { getFileStream } from '../configs/s3.config.js';

const get = async (filePath) => {
  return await getFileStream(filePath);
};

export default { get };
