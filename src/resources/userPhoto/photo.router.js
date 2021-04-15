const router = require('express').Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

const loader = multer({ dest: path.join(__dirname, 'tmp') });

router.post('/upload', loader.single('avatar'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      upload_preset: 'rslang',
      transformation: [
        {
          width: 400,
          height: 400,
          gravity: 'face',
          radius: 'max',
          crop: 'thumb'
        },
        { width: 200, crop: 'scale' }
      ]
    });
    res.send(result);
  } catch (error) {
    res.send(error);
  }
  fs.unlink(req.file.path);
});

module.exports = router;
