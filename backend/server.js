const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Allowed origins (local + production frontend + custom domains)
const allowedOrigins = [
  "http://localhost:5174",                 // local dev
  "https://inverter-front.onrender.com",   // Render default frontend domain
  "https://invdtpvinverter.com",           // custom domain
  "https://www.invdtpvinverter.com",       // www custom domain
  process.env.FRONTEND_URL                 // optional (if you set in .env)
].filter(Boolean); // remove undefined if env is not set

// Dynamic CORS config
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like curl, Postman, mobile apps)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error("❌ CORS blocked for origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// --- Database Connection ---
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// --- Routes ---
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const carouselRoutes = require("./routes/carouselRoutes");

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminAuthRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/carousel", carouselRoutes);

// --- Health Check ---
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// --- Start Server ---
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
