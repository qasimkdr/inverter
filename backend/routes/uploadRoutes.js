const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../config/cloudinaryConfig');
const { protectAdminRoute } = require('../middleware/authMiddleware');

const storage = multer.diskStorage({});
const upload = multer({ storage: storage });

router.post('/', protectAdminRoute, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'ecommerce-images', // A dedicated folder in Cloudinary
    });

    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: 'Image upload failed', error: error.message });
  }
});

module.exports = router;