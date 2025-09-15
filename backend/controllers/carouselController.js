const CarouselImage = require('../models/CarouselImage');
const cloudinary = require('../config/cloudinaryConfig');

// Get all carousel images
exports.getCarouselImages = async (req, res) => {
  try {
    const images = await CarouselImage.find().sort({ createdAt: 1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new carousel image (from a Cloudinary URL)
exports.addCarouselImage = async (req, res) => {
  const { imageUrl } = req.body;
  const newImage = new CarouselImage({ imageUrl });

  try {
    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a carousel image
exports.deleteCarouselImage = async (req, res) => {
  try {
    const image = await CarouselImage.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    const publicId = image.imageUrl.split('/').pop().split('.')[0];
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }
    
    await image.deleteOne();
    res.json({ message: 'Image deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};