import multer from 'multer';

const storage = multer.memoryStorage(); // Store files in memory

const fileFilter = (req, file, cb) => {
  const isImage = file.mimetype.startsWith('image/');
  cb(null, isImage);
};

const upload = multer({ storage, fileFilter });

export default upload;
