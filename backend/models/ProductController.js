const Product = require('../models/Product');
const cloudinary = require('../config/cloudinaryConfig');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get trending products
exports.getTrendingProducts = async (req, res) => {
  try {
    const trendingProducts = await Product.find({ isTrending: true });
    res.json(trendingProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new product (Admin only)
exports.createProduct = async (req, res) => {
  const { name, description, price, isTrending, imageUrl } = req.body;
  
  // NOTE: In a real app, you would handle the image upload to Cloudinary here
  // and get the secure URL. For simplicity, we'll assume the client sends the URL.
  // Example with image upload:
  // const result = await cloudinary.uploader.upload(req.file.path);
  // const imageUrl = result.secure_url;

  const newProduct = new Product({ name, description, price, isTrending, imageUrl });
  
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
