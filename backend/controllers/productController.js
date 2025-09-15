const Product = require("../models/Product");

// GET /api/products (with optional ?search=)
exports.getAllProducts = async (req, res) => {
  try {
    const search = req.query.search || "";
    let query = {};

    if (search) {
      // ✅ Match only by product name (case-insensitive, partial match)
      query = { name: { $regex: search, $options: "i" } };
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    res.status(500).json({ message: "Server error fetching products" });
  }
};

// GET /api/products/trending
exports.getTrendingProducts = async (req, res) => {
  try {
    const products = await Product.find({ isTrending: true });
    res.json(products);
  } catch (err) {
    console.error("❌ Error fetching trending products:", err);
    res.status(500).json({ message: "Server error fetching trending products" });
  }
};

// POST /api/products (Admin only)
exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error("❌ Error creating product:", err);
    res.status(400).json({ message: "Failed to create product" });
  }
};

// PUT /api/products/:id (Admin only)
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    console.error("❌ Error updating product:", err);
    res.status(400).json({ message: "Failed to update product" });
  }
};

// DELETE /api/products/:id (Admin only)
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error("❌ Error deleting product:", err);
    res.status(400).json({ message: "Failed to delete product" });
  }
};
