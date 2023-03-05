import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    const fileExtension = file.originalname.split('.').pop();
    cb(null, `${Date.now()}-${uuidv4()}.${fileExtension}`);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const fileMimetype = file.mimetype;
    const fileType = fileMimetype.substring(0, fileMimetype.indexOf('/'));

    const validImageMimetypes = ['image/png', 'image/jpg', 'image/jpeg'];

    if (fileType === 'image' || fileType === 'audio') {
      if (
        fileType === 'image' &&
        validImageMimetypes.indexOf(fileMimetype) === -1
      ) {
        const err = new Error(
          'Only .png, .jpg, .jpeg formats allowed for images!'
        );
        err.name = 'ExtensionError';
        return cb(err);
      }

      cb(null, true);
    } else {
      const err = new Error('Only Image and Audio formats are allowed!');
      err.name = 'MediaTypeError';

      cb(err);
    }
  },
});

export const acceptedFiles = [
  {
    name: 'soundFile',
    maxCount: 1,
  },
  {
    name: 'imageFile',
    maxCount: 1,
  },
];

export default upload;
