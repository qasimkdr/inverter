// backend/routes/categoryRoutes.js
const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const { protectAdminRoute } = require("../middleware/authMiddleware");

// Get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new category
router.post("/", protectAdminRoute, async (req, res) => {
  try {
    const category = new Category({ name: req.body.name });
    const saved = await category.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
