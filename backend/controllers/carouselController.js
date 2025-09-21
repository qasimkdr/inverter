const CarouselImage = require("../models/CarouselImage");
const cloudinary = require("../config/cloudinaryConfig");
const streamifier = require("streamifier");

// Get all carousel images
exports.getCarouselImages = async (req, res) => {
  try {
    const images = await CarouselImage.find().sort({ createdAt: 1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new carousel image (via Multer upload)
exports.addCarouselImage = async (req, res) => {
  try {
    console.log("📩 Incoming upload:", {
      body: req.body,
      file: req.file ? req.file.originalname : null,
    });

    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    // Upload file to Cloudinary (streaming)
    const uploadStream = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "carousel" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

    const result = await uploadStream();

    const newImage = new CarouselImage({ imageUrl: result.secure_url });
    await newImage.save();

    res.status(201).json(newImage);
  } catch (err) {
    console.error("❌ Upload error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Delete a carousel image
exports.deleteCarouselImage = async (req, res) => {
  try {
    const image = await CarouselImage.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Derive public_id from URL to delete from Cloudinary
    const publicId = image.imageUrl
      .split("/")
      .pop()
      .split(".")[0];

    if (publicId) {
      await cloudinary.uploader.destroy(`carousel/${publicId}`);
    }

    await image.deleteOne();
    res.json({ message: "Image deleted" });
  } catch (err) {
    console.error("❌ Delete error:", err);
    res.status(500).json({ message: err.message });
  }
};
