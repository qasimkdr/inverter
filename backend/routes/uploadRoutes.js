const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../config/cloudinaryConfig');

const storage = multer.diskStorage({}); // Use memory storage or disk storage

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'ecommerce-products', // Optional: specify a folder
    });

    // Send the Cloudinary URL back to the frontend
    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: 'Image upload failed', error: error.message });
  }
});

module.exports = router;