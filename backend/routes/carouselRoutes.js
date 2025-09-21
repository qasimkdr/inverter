const express = require("express");
const router = express.Router();
const multer = require("multer");
const carouselController = require("../controllers/carouselController");
const { protectAdminRoute } = require("../middleware/authMiddleware");

// ✅ Use memory storage so files are uploaded directly from buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// --- Routes ---
router.get("/", carouselController.getCarouselImages);

// ✅ Upload a new carousel image
router.post(
  "/",
  protectAdminRoute,
  upload.single("image"), // frontend must send field name "image"
  carouselController.addCarouselImage
);

// ✅ Delete carousel image
router.delete("/:id", protectAdminRoute, carouselController.deleteCarouselImage);

module.exports = router;
