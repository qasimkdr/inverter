const express = require("express");
const multer = require("multer");
const carouselController = require("../controllers/carouselController");
const { protectAdminRoute } = require("../middleware/authMiddleware");

const router = express.Router();

// Use memory storage so we can stream directly to Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", carouselController.getCarouselImages);
router.post(
  "/",
  protectAdminRoute,
  upload.single("image"),   // field name must be "image"
  carouselController.addCarouselImage
);
router.delete("/:id", protectAdminRoute, carouselController.deleteCarouselImage);

module.exports = router;
