const CarouselImage = require("../models/CarouselImage");
const cloudinary = require("../config/cloudinaryConfig");
const { Readable } = require("stream"); // ✅ Built-in stream

// Get all carousel images
exports.getCarouselImages = async (req, res) => {
  try {
    const images = await CarouselImage.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new carousel image (with file upload to Cloudinary)
exports.addCarouselImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload buffer to Cloudinary using upload_stream
    const uploadStream = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "carousel" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        // Pipe buffer into the Cloudinary upload stream
        Readable.from(req.file.buffer).pipe(stream);
      });

    const result = await uploadStream();

    // Save in DB
    const newImage = new CarouselImage({ imageUrl: result.secure_url });
    const savedImage = await newImage.save();

    res.status(201).json(savedImage);
  } catch (err) {
    console.error("❌ Error uploading carousel image:", err);
    res.status(500).json({ message: "Error uploading carousel image", error: err.message });
  }
};

// Delete a carousel image
exports.deleteCarouselImage = async (req, res) => {
  try {
    const image = await CarouselImage.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Extract public_id from the URL for deletion
    const publicId = image.imageUrl.split("/").pop().split(".")[0];
    if (publicId) {
      await cloudinary.uploader.destroy(`carousel/${publicId}`);
    }

    await image.deleteOne();
    res.json({ message: "Image deleted" });
  } catch (err) {
    console.error("❌ Error deleting carousel image:", err);
    res.status(500).json({ message: "Error deleting carousel image", error: err.message });
  }
};
