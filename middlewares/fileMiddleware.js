const multer = require('multer');
const path = require('path');

const upload = multer({
  dest: path.join(__dirname, '../uploads'), // Carpeta donde se guardan los ficheros
  limits: { fileSize: 2 * 1024 * 1024 }, // Límite de 2MB por archivo
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/; // Formato
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos JPG o PNG'));
    }
  },
});

const errorFileHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message === 'Solo se permiten archivos JPG o PNG') {
    return res.status(400).json({ success: false, error: err.message });
  }
  next(err);
};

module.exports = { upload, errorFileHandler };
